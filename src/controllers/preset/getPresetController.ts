import { Request, Response } from "express";
import getPresetHandler from "../../handlers/preset/getPresetHandler";

enum OrderType {
  NAME = "name",
  PRICE = "price",
  PURCHASED = "purchased",
  RATING = "rating",
  RELEASE = "release",
}
enum OrderPriority {
  ASC = "a",
  ADMIN_ASC = "ASC",
  DESC = "d",
  ADMIN_DESC = "DESC",
}

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

interface Preset {
  ids?: string;
  page?: number;
  quantity?: number;
  orderType?: OrderType;
  orderPriority?: OrderPriority;
  filters?: string;
  userEmail?: string;
}

interface adminQueries {
  _start?: number;
  _end?: number;
  _order?: OrderPriority;
  _sort?: OrderType;
  type?: TypeFilter;
  category?: CategoryFilter;
}

const getPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      ids,
      page,
      quantity,
      orderType,
      orderPriority,
      filters,
      userEmail,
    }: Preset = req.query;

    const { _start, _end, _order, _sort, type, category }: adminQueries =
      req.query;

    const presets = await getPresetHandler(
      { _start, _end, _order, _sort, type, category: category },
      {
        ids,
        page,
        quantity,
        orderType,
        orderPriority,
        filters,
        userEmail,
      }
    );
    const totalCount = presets ? presets.length : 0;
    res.setHeader("X-Total-Count", totalCount);
    res.status(200).json(presets);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getPresetController;
