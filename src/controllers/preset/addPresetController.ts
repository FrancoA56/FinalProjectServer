import { Request, Response } from "express";
import addPresetHandler from "../../handlers/preset/addPresetHandler";

const addPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    enum PresetTypes {
      ABOUT = "about",
      HOME = "home",
      CART = "card",
      SHOP = "shop",
      DETAIL = "detail",
      PROFILE = "profile",
    }
    enum PresetCategories {
      BASIC = "basic",
      MEDIUM = "medium",
      PREMIUM = "premium",
    }

    interface Preset {
      name?: string;
      price?: number;
      defaultColor?: string;
      type?: PresetTypes;
      category?: PresetCategories;
    }

    const { name, price, defaultColor, type, category }: Preset = req.body;

    const preset = await addPresetHandler({
      name,
      price,
      defaultColor,
      type,
      category,
    });
    res.status(201).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addPresetController;
