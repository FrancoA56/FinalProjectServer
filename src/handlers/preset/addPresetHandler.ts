import { Preset } from "../../db";

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
  image?: string;
  url?: string;
}

const addPresetHandler = async ({
  name,
  price = 1,
  defaultColor,
  type = PresetTypes.HOME,
  category = PresetCategories.BASIC,
  image,
  url,
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
    image,
    url,
  });

  return newPreset;
};

export default addPresetHandler;
