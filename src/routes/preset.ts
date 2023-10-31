import { Router } from "express";
import getPresetController from "../controllers/preset/getPresetController";
import getPresetByIdController from "../controllers/preset/getPresetByIdController";
import addPresetController from "../controllers/preset/addPresetController";
import editPresetController from "../controllers/preset/editPresetController";
import disablePresetController from "../controllers/preset/disablePresetController";

const presetRouter = Router();

presetRouter.get("/:id", getPresetByIdController);
presetRouter.get("/", getPresetController);
presetRouter.post("/", addPresetController)
presetRouter.put("/:id", editPresetController)
presetRouter.delete("/:id", disablePresetController)

export default presetRouter;
