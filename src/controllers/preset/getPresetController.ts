import { Request, Response } from "express";
import getPresetHandler from "../../handlers/preset/getPresetHandler";

const getPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Preset {
      id?: number;
    }
    const { id }: Preset = req.query;
    const presets = await getPresetHandler(id);
    res.status(200).json(presets);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getPresetController;
