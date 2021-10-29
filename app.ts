import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import morgan from 'morgan';
import { configureExpressApp } from './source/swagger-config';
import { CommonRoutesConfig } from './source/common/common.routes.config';
import { PartnersRoutes } from './source/routes/partners.routes.config';
import app from './server';
import logger from './logger';

const routes: Array<CommonRoutesConfig> = [new PartnersRoutes(app)];


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

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
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