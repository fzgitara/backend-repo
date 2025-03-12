import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import cors from 'cors';

import routes from '../routes/userRoutes';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookies());
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});