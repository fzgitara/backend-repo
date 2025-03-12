import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';

import routes from '../routes/userRoutes';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookies());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});