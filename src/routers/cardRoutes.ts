import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import createCardSchema from "../schemas/createCardSchema";
import { validateApiKey } from "../middlewares/validateApiKey";
import { createCard } from "../controllers/cardOperationsController";
const router:Router = Router();

router.post("/cards/create", validateSchema(createCardSchema), validateApiKey, createCard )

export default router;
