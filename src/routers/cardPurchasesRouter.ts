import {Router} from 'express';
import purchaseSchema from '../schemas/cardPurchasePOSSchema'
import validateSchema from '../middlewares/validateSchema';

const router: Router = Router();

router.post('cards/purchasePOS/:id',validateSchema(purchaseSchema), )

export default router;