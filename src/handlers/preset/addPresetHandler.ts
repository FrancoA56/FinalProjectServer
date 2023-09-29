import { Preset } from "../../db";

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

interface Preset {
  name?: string;
  price?: number;
  defaultColor?: string;
  type?: PresetTypes;
  category?: PresetCategories;
}

const addPresetHandler = async ({
  name,
  price = 1,
  defaultColor,
  type = PresetTypes.CARD,
  category = PresetCategories.BASIC,
}: Preset) => {
  if (!name || !price || !defaultColor || !type || !category)
    throw new Error("Missing data to create a Preset");

  const newPreset = await Preset.create({
    name,
    price,
    defaultColor,
    type,
    category,
    isDisabled: false,
  });

  return newPreset;
};

export default addPresetHandler;
