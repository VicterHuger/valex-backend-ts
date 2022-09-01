import { Router } from "express";
import cardRouter from './cardRoutes';

const router:Router = Router();

router.use([cardRouter]);

export default router;