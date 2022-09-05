import { Router } from "express";
import cardRouter from './cardRoutes';
import cardActivationRouter from './cardActivationRoutes';
import cardBlockRouter from './cardBlockRoutes';

const router:Router = Router();

router.use([cardRouter, cardActivationRouter, cardBlockRouter]);

export default router;