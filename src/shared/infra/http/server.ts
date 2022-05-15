import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/api/routes';

import '@shared/container';
import { graphqlRouter } from './graphql';

const app = express();

dotenv.config();

app.use(express.json());

app.use(router);

app.use(graphqlRouter);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response
      .status(500)
      .json({ message: `Internal Server Error - ${err.message}` });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
