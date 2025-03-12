import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import routes from '../routes/userRoutes';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});