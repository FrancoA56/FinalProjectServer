import { Request, Response } from "express";
import editPresetHandler from "../../handlers/preset/editPresetHandler";

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

const editPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Preset {
      id?: number;
      name?: string;
      price?: number;
      color?: string;
      type?: PresetTypes;
      category?: PresetCategories;
      isDisabled?: boolean;
      images?: string[];
      url?: string;
    }
    const { id }: Preset = req.params;
    const {
      name,
      price,
      color,
      type,
      category,
      isDisabled,
      images,
      url,
    }: Preset = req.body;

    const preset = await editPresetHandler(id, {
      name,
      price,
      defaultColor: color,
      type,
      category,
      isDisabled,
      images,
      url,
    });
    res.status(200).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editPresetController;
