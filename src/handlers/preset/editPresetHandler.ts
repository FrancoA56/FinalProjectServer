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
  id?: number;
  name?: string;
  price?: number;
  defaultColor?: string;
  type?: PresetTypes;
  category?: PresetCategories;
  isDisabled?: boolean;
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
