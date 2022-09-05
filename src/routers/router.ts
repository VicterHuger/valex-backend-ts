import { Router } from "express";
import cardRouter from './cardRoutes';
import cardActivationRouter from './cardActivationRoutes';
import cardBlockRouter from './cardBlockRoutes';
import cardRechargeRouter from './cardRechargeRoutes';
import cardPurchaseRouter from './cardPurchaseRoutes';

const router:Router = Router();

router.use([cardRouter, cardActivationRouter, cardBlockRouter, cardRechargeRouter, cardPurchaseRouter]);

export default router;