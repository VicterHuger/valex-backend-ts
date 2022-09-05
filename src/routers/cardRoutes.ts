import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import createCardSchema from "../schemas/createCardSchema";
import { validateApiKey } from "../middlewares/validateApiKey";
import { createCard, listTransactions } from "../controllers/cardOperationsController";
import { validateIdParam } from "../middlewares/validateIdParam";
const router:Router = Router();

router.post("/cards/create/:id", validateSchema(createCardSchema), validateApiKey, validateIdParam ,createCard );
router.get("/cards/transactions/:id", validateIdParam, listTransactions)

export default router;
