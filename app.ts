import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import morgan from 'morgan';
import { configureExpressApp } from './source/swagger-config';
import app from './server';
import logger from './logger';


/**
 * This is a bootstrap function
 */
async function bootstrap() {
  // Attach HTTP request info logger middleware in test mode
  if (process.env.NODE_ENV === 'test') {
    app.use((req: express.Request, _res, next) => {
      logger.debug(`[${req.method}] ${req.hostname}${req.url}`);

      next();
    });
  }

  /** Logging */
  app.use(morgan('dev'));
  /** Parse the request */
  app.use(express.urlencoded({ extended: false }));
  /** Takes care of JSON data */
  app.use(express.json());

  /** Configuration */
  configureExpressApp(app);
}


// Need for integration testing
export default app;

// Invoking the bootstrap function
bootstrap()
  .then(() => {
    logger.info('Server is up');
  })
  .catch((error) => {
    logger.error('Unknown error. ' + error.message);
  });