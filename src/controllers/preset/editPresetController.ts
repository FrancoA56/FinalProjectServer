import { Request, Response } from "express";
import editPresetHandler from "../../handlers/preset/editPresetHandler";

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
    }
    const { id }: Preset = req.params;
    const { name, price, color, type, category, isDisabled }: Preset =
      req.query;
    const preset = await editPresetHandler(id, {
      name,
      price,
      defaultColor: color,
      type,
      category,
      isDisabled,
    });
    res.status(200).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editPresetController;
