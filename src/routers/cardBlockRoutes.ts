import {Router} from 'express';
import * as cardBlockController from '../controllers/cardBlockController'
import cardPasswordSchema from '../schemas/cardPasswordSchema';
import { validateIdParam } from '../middlewares/validateIdParam';
import validateSchema from '../middlewares/validateSchema';


const router:Router = Router ();

router.patch("/cards/unblock/:id", validateSchema(cardPasswordSchema), validateIdParam, cardBlockController.unblockCard);
router.patch("/cards/block/:id", validateSchema(cardPasswordSchema),validateIdParam, cardBlockController.blockCard )

export default router;