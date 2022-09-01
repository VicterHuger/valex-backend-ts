import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-middleware';

import router from './routers/cardRoutes';

dotenv.config();

const app: express.Express = express();

app.use([cors(), json(), router]);

const PORT:string = process.env?.PORT ?? '4001';

app.listen(PORT, ():void => console.log(`Server listening on PORT: ${PORT}`));
