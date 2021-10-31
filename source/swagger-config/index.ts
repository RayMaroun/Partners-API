import cors from 'cors';
import express from 'express';
import { configureSwagger } from './swaggerConfig';

export function configureExpressApp(app: express.Application) {
  app.use(express.json());
  app.use(cors());
  configureSwagger(app);
}
