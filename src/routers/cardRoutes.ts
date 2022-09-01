import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import createCardSchema from "../schemas/createCardSchema";
import { validateApiKey } from "../middlewares/validateApiKey"
const router:Router = Router();

router.post("/cards/create", validateSchema(createCardSchema), validateApiKey )

export default router;
