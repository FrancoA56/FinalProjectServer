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

const editPresetHandler = async (
  id: number | undefined,
  presetInfo: Preset | undefined
) => {
  const validValues = Object.values(presetInfo).filter((value) => !!value);
  if (!validValues.length) throw new Error("Properties to edit are empty.");

  await Preset.update(presetInfo, { where: { id } });
  return await Preset.findOne({ where: { id } });
};

export default editPresetHandler;
