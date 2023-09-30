import { Model } from "sequelize";
import { Preset, UserPreset } from "../../db";

enum PresetTypes {
  ABOUT = "about",
  HOME = "home",
  FORM = "form",
  CARD = "card",
}
enum PresetCategories {
  BASIC = "basic",
  MEDIUM = "medium",
  PREMIUM = "premium",
}

enum OrderType {
  NAME = "name",
  PRICE = "price",
  PURCHASED = "purchased",
  RATING = "rating",
  RELEASE = "release",
}

enum OrderPriority {
  ASC = "a",
  DESC = "d",
}

interface Review {
  message?: string;
  rating?: number;
}

interface Filter {
  type?: PresetTypes;
  category?: PresetCategories;
  defaultColor?: string;
}

interface Params {
  page?: number;
  quantity?: number;
  orderType?: OrderType;
  orderPriority?: OrderPriority;
  filters?: string;
}

const getPresetHandler = async ({
  page = 1,
  quantity = 10,
  orderType = OrderType.RATING,
  orderPriority = OrderPriority.DESC,
  filters,
}: Params) => {
  const parsedFilters: Filter = filters ? JSON.parse(filters) : {};
  const filteredPresets = await Preset.findAll({ where: { ...parsedFilters } });

  const getReviews = async (preset: Model) => {
    const userPresets = await UserPreset.findAll({
      where: { presetId: preset.dataValues.id },
    });
    const reviews: Review[] = userPresets.map((userPreset) => {
      const reviews = userPreset.dataValues.reviews;
      return {
        message: reviews.dataValues.message,
        rating: reviews.dataValues.rating,
      };
    });
    return reviews;
  };

  const calculateAverageRatings = async (presets: Model[]) => {
    const avgRatings: Record<number, number> = {};

    await Promise.all(
      presets.map(async (preset) => {
        const reviews = await getReviews(preset);
        if (!reviews.length) return 0;
        const totalRatings = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        avgRatings[preset.dataValues.id] = totalRatings / reviews.length;
      })
    );

    return avgRatings;
  };
  const averageRatings = await calculateAverageRatings(filteredPresets);

  const sortingFunction = (a: Model, b: Model) => {
    const sortOrder = orderPriority === OrderPriority.ASC ? 1 : -1;

    switch (orderType) {
      case OrderType.NAME:
        return sortOrder * a.dataValues.name.localeCompare(b.dataValues.name);
      case OrderType.PRICE:
        return sortOrder * (a.dataValues.price - b.dataValues.price);
      case OrderType.PURCHASED:
        const purchasedA = a.dataValues.users ? a.dataValues.users.length : 0;
        const purchasedB = b.dataValues.users ? b.dataValues.users.length : 0;
        return sortOrder * (purchasedA - purchasedB);
      case OrderType.RELEASE:
        const dateA = new Date(a.dataValues.createdAt).getTime();
        const dateB = new Date(b.dataValues.createdAt).getTime();
        return sortOrder * (dateA - dateB);
      case OrderType.RATING:
        const avgRatingA = averageRatings[a.dataValues.id];
        const avgRatingB = averageRatings[b.dataValues.id];
        return sortOrder * (avgRatingA - avgRatingB);
      default:
        return 0;
    }
  };
  const orderedPresets = filteredPresets.sort(sortingFunction);

  const presets = await Promise.all(
    orderedPresets.map(async (preset) => {
      const { dataValues: data } = preset;
      const reviews = await getReviews(preset);
      const ratingAverage = await calculateAverageRatings([preset]);

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        color: data.defaultColor,
        type: data.type,
        category: data.category,
        reviews,
        ratingAverage: ratingAverage[data.id],
        purchased: data.users ? data.users.length : 0,
        isDisabled: data.isDisabled,
        release: data.createdAt,
      };
    })
  );
  return presets.slice(page * quantity - quantity, page * quantity);
};

export default getPresetHandler;
