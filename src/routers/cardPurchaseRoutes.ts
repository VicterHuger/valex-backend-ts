import { Router } from "express";
import { createPurchase } from "../controllers/cardPurchasesControler";
import { validateIdParam } from "../middlewares/validateIdParam";
import validateSchema from "../middlewares/validateSchema";
import purchasePOSSchema from '../schemas/cardPurchasePOSSchema';
import { listTransactions } from "../controllers/cardOperationsController";

const router:Router = Router();

router.post("/cards/purchase/:id", validateSchema(purchasePOSSchema), validateIdParam, createPurchase);

export default router;