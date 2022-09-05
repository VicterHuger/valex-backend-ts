import {Router} from 'express';
import * as cardBlockController from '../controllers/cardBlockController'
import cardUnblockSchema from '../schemas/cardUnblockSchema';
import { validateIdParam } from '../middlewares/validateIdParam';
import validateSchema from '../middlewares/validateSchema';


const router:Router = Router ();

router.patch("/cards/unblock/:id", validateSchema(cardUnblockSchema), validateIdParam, cardBlockController.unblockCard);

export default router;