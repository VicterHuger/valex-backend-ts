import { Router } from "express";
import cardRouter from './cardRoutes';
import cardActivationRouter from './cardActivationRoutes';
import cardBlockRouter from './cardBlockRoutes';
import cardRecharge from './cardRecharge';

const router:Router = Router();

router.use([cardRouter, cardActivationRouter, cardBlockRouter, cardRecharge]);

export default router;