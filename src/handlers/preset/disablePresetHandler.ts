import { Preset } from "../../db";
const disablePresetHandler = async (id: number | undefined) => {
  await Preset.update({ isDisabled: true }, { where: { id } });
  return await Preset.findOne({ where: { id } });
};

export default disablePresetHandler;
