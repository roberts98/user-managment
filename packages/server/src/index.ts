import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/users';
import { createConnection } from './db';

async function bootstrap() {
  try {
    const app = express();
    const PORT = 3000;
    createConnection();

    app.use(bodyParser.json());
    app.use('/api/users', userRouter);

    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
