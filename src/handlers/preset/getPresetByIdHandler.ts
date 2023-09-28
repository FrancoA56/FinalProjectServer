import { Preset } from "../../db";
const getPresetByIdHandler = async (id: number | undefined) => {
  if (!id) throw new Error("Missing id");

  const preset = await Preset.findOne({ where: { id } });
  if (!preset) throw new Error("Preset not found with the specified id");

  return preset;
};

export default getPresetByIdHandler;
