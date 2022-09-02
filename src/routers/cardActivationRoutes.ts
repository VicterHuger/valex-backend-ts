import { Router } from "express";
import { activateCard } from "../controllers/cardActivationController";
import { validateIdParam } from "../middlewares/validateIdParam";
import validateSchema from "../middlewares/validateSchema";
import cardActivateSchema from "../schemas/cardActivateSchema";

const router:Router = Router();

router.patch("/cards/activate/:id", validateSchema(cardActivateSchema), validateIdParam, activateCard);

export default router;