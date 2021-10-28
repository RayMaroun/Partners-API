import cors from 'cors';
import express from 'express';
import { configureSwagger } from './swaggerConfig';

/**
 * Configure middlewars to use with express app
 * @param {express.Application} app ExpressJs application instance
 */
export function configureExpressApp(app: express.Application) {
  app.use(express.json());
  app.use(cors());
  configureSwagger(app);
}
