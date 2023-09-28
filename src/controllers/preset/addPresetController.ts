import { Request, Response } from "express";
import addPresetHandler from "../../handlers/preset/addPresetHandler"

const addPresetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Preset {
      id?: number;
      name?: string;
      type?: string;
    }
    const { id, name, type }: Preset = req.body;
    const preset = await addPresetHandler(id, name, type);
    res.status(201).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default addPresetController;
