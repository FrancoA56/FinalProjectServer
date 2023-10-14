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
  DESC = "d",
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
    const presets = await getPresetHandler({
      ids,
      page,
      quantity,
      orderType,
      orderPriority,
      filters,
      userEmail,
    });
    res.status(200).json(presets);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getPresetController;
