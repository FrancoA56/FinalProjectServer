import { Request, Response } from "express";
import editPresetHandler from "../../handlers/preset/editPresetHandler";

const editPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Preset {
      id?: number;
      name?: string;
      type?: string;
    }
    const { id }: Preset = req.params;
    const { name, type }: Preset = req.query;
    const preset = await editPresetHandler(id, name, type);
    res.status(200).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default editPresetController;
