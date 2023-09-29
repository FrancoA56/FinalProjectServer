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

const addPresetHandler = async (
  name: string | undefined,
  price: number | undefined,
  defaultColor: string | undefined,
  type: PresetTypes | undefined,
  category: PresetCategories | undefined
) => {
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
