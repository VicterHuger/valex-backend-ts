import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Express = express();

app.use([cors(), json()]);

const PORT:string = process.env?.PORT ?? '4001';

app.listen(PORT, ():void => console.log(`Server listening on PORT: ${PORT}`))
