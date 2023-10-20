import { Model, Op } from "sequelize";
import { Invoice, InvoiceItem, Preset, PresetImage, Review } from "../../db";
import getPresetByIdHandler from "./getPresetByIdHandler";

enum TypeFilter {
  ABOUT = "about",
  HOME = "home",
  CART = "cart",
  SHOP = "shop",
  DETAIL = "detail",
  PROFILE = "profile",
}
enum CategoryFilter {
  BASIC = "basic",
  MEDIUM = "medium",
  PREMIUM = "premium",
}

enum OrderType {
  NAME = "name",
  PRICE = "price",
  COLOR = "color",
  TYPE = "type",
  CATEGORY = "category",
  RELEASE = "release",
  PURCHASED = "purchased",
  RATING = "rating",
}

enum OrderPriority {
  ASC = "a",
  ADMIN_ASC = "ASC",
  DESC = "d",
  ADMIN_DESC = "DESC",
}

interface Filter {
  types?: TypeFilter[];
  categories?: CategoryFilter[];
  defaultColors?: string[];
}

interface Params {
  ids?: string;
  page?: number;
  quantity?: number;
  orderType?: OrderType;
  orderPriority?: OrderPriority;
  filters?: string;
  userEmail?: string;
  hideDisabled?: boolean;
}

interface adminQueries {
  _start?: number;
  _end?: number;
  _order?: OrderPriority;
  _sort?: OrderType;
  type?: TypeFilter;
  category?: CategoryFilter;
  name?: string;
}

const getPresetHandler = async (
  {
    _start,
    _end,
    _order = OrderPriority.ADMIN_ASC,
    _sort = OrderType.NAME,
    type,
    category,
    name,
  }: adminQueries,
  {
    ids,
    page = 1,
    quantity = 10,
    orderType = _sort,
    orderPriority = _order,
    filters,
    userEmail,
    hideDisabled = false,
  }: Params
) => {
  if (ids)
    return await Promise.all(
      ids.split(",").map(async (id) => {
        try {
          return await getPresetByIdHandler(Number(id));
        } catch {
          return null;
        }
      })
    );

  const parsedFilters: Filter = filters ? JSON.parse(filters) : {};
  let { types = [], categories = [], defaultColors = [] } = parsedFilters;

  if (!Array.isArray(types)) types = [types];
  if (!Array.isArray(categories)) categories = [categories];
  if (!Array.isArray(defaultColors)) defaultColors = [defaultColors];

  const whereFilters = [];

  if (types?.length)
    whereFilters.push({
      [Op.or]: types.map((type) => ({
        type,
      })),
    });

  if (categories?.length)
    whereFilters.push({
      [Op.or]: categories.map((category) => ({
        category,
      })),
    });

  if (defaultColors?.length)
    whereFilters.push({
      [Op.or]: defaultColors.map((defaultColor) => ({
        defaultColor,
      })),
    });

  const filteredPresets = await Preset.findAll({
    where: {
      [Op.and]: whereFilters,
    },
  });
  const enabledPresets = filteredPresets.filter((filter) =>
    hideDisabled ? !filter.dataValues.isDisabled : true
  );

  const getReviews = async (preset: Model) => {
    const reviews = await Review.findAll({
      where: { presetId: preset.dataValues.id },
    });
    return reviews.map((review) => {
      return {
        message: review.dataValues.ratingMessage,
        rating: review.dataValues.rating,
      };
    });
  };

  const calculateAverageRatings = async (presets: Model[]) => {
    const avgRatings: Record<number, number> = {};

    await Promise.all(
      presets.map(async (preset) => {
        const reviews = await getReviews(preset);
        if (!reviews?.length) return 0;
        const totalRatings = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        avgRatings[preset.dataValues.id] = totalRatings / reviews?.length;
      })
    );

    return avgRatings;
  };
  const averageRatings = await calculateAverageRatings(enabledPresets);

  const getSells = async (presets: Model[]) => {
    const sells: Record<number, number> = {};

    await Promise.all(
      presets.map(async (preset) => {
        const presetId = preset.dataValues.id;
        const totalSells = await Invoice.count({
          distinct: true,
          col: "userEmail",
          where: { isPaid: true },
          include: [
            {
              model: InvoiceItem,
              where: { presetId },
            },
          ],
        });
        sells[presetId] = totalSells;
      })
    );

    return sells;
  };
  const sells = await getSells(enabledPresets);

  const sortingFunction = (a: Model, b: Model) => {
    const sortOrder =
      orderPriority === OrderPriority.ASC ||
      orderPriority === OrderPriority.ADMIN_ASC
        ? 1
        : -1;

    const aData = a.dataValues;
    const bData = b.dataValues;
    switch (orderType) {
      case OrderType.NAME:
        return sortOrder * aData.name.localeCompare(bData.name);
      case OrderType.PRICE:
        return sortOrder * (aData.price - bData.price);
      case OrderType.COLOR:
        return sortOrder * aData.defaultColor.localeCompare(bData.defaultColor);
      case OrderType.TYPE:
        return sortOrder * aData.type.localeCompare(bData.type);
      case OrderType.CATEGORY:
        return sortOrder * aData.category.localeCompare(bData.category);
      case OrderType.RELEASE:
        const dateA = new Date(aData.createdAt).getTime();
        const dateB = new Date(bData.createdAt).getTime();
        return sortOrder * (dateA - dateB);
      case OrderType.PURCHASED:
        const purchasedA = sells[aData.id];
        const purchasedB = sells[bData.id];
        return sortOrder * (purchasedA - purchasedB);
      case OrderType.RATING:
        const avgRatingA = averageRatings[aData.id];
        const avgRatingB = averageRatings[bData.id];
        return sortOrder * (avgRatingA - avgRatingB);
      default:
        return 0;
    }
  };
  const orderedPresets = enabledPresets.sort(sortingFunction);

  const presets = await Promise.all(
    orderedPresets.map(async (preset) => {
      const { dataValues: data } = preset;
      const reviews = await getReviews(preset);
      const ratingAverage = await calculateAverageRatings([preset]);
      const purchased = await getSells([preset]);
      const boughtPreset = userEmail
        ? await Invoice.findOne({
            where: { isPaid: true, userEmail },
            include: [
              {
                model: InvoiceItem,
                where: { presetId: data.id },
              },
            ],
          })
        : false;
      const images = await PresetImage.findAll({
        where: { presetId: data.id },
      });

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        color: data.defaultColor,
        type: data.type,
        category: data.category,
        images: images.map((img) => img.dataValues.url),
        url: data.url,
        reviews,
        ratingAverage: ratingAverage[data.id],
        purchased: purchased[data.id],
        isBought: !!boughtPreset,
        isDisabled: data.isDisabled,
        release: data.createdAt,
      };
    })
  );
  const adminFilteredPresets = presets.filter((preset) => {
    const nameRegex = new RegExp(name, "i");
    const isTypeFiltered = type ? preset.type === type : true;
    const isCategoryFiltered = category ? preset.category === category : true;
    const hasName = name ? nameRegex.test(preset.name) : true;

    return hasName && isTypeFiltered && isCategoryFiltered;
  });

  if (_start) return adminFilteredPresets.slice(_start, _end);
  return adminFilteredPresets.slice(
    page * quantity - quantity,
    page * quantity
  );
};

export default getPresetHandler;
