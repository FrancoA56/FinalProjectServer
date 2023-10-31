import { Request, Response } from "express";
import getPresetByIdHandler from "../../handlers/preset/getPresetByIdHandler";

const getPresetByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Preset {
      id?: number;
    }
    const { id }: Preset = req.params;
    const preset = await getPresetByIdHandler(id);
    res.status(200).json(preset);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getPresetByIdController;
