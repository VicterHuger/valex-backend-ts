import { Router } from "express";
import { rechargeCard } from "../controllers/cardRechargeController";
import { validateApiKey } from "../middlewares/validateApiKey";
import { validateIdParam } from "../middlewares/validateIdParam";
import validateSchema from "../middlewares/validateSchema";
import cardRechargeSchema from "../schemas/cardRechargeSchema";

const router: Router = Router();

router.post('/cards/recharge/:id',validateSchema(cardRechargeSchema), validateApiKey, validateIdParam, rechargeCard);

export default router;