import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import errorHandler  from './middlewares/errorHandlerMiddleware';
import router from './routers/router';

dotenv.config();

const app: express.Express = express();

app.use([cors(), json(), router, errorHandler]);

const PORT:number = Number(process.env?.PORT) ?? 4001;

app.listen(PORT, ():void => console.log(`Server listening on PORT: ${PORT}`));
