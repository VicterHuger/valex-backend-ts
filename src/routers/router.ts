import { Router } from "express";
import cardRouter from './cardRoutes';
import cardActivationRouter from './cardActivationRoutes'

const router:Router = Router();

router.use([cardRouter, cardActivationRouter]);

export default router;