import { Router } from "express";
import getPresetController from "../controllers/preset/getPresetController";
import addPresetController from "../controllers/preset/addPresetController";
import editPresetController from "../controllers/preset/editPresetController";
import disablePresetController from "../controllers/preset/disablePresetController";

const presetRouter = Router();

presetRouter.get("/", getPresetController);
presetRouter.post("/", addPresetController)
presetRouter.put("/:id", editPresetController)
presetRouter.delete("/:id", disablePresetController)

export default presetRouter;
