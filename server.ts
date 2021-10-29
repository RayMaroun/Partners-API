import express from 'express';
import * as dotenv from 'dotenv';
import { PartnersRoutes } from './source/routes/partners.routes.config';
import { CommonRoutesConfig } from './source/common/common.routes.config';
dotenv.config();
import logger from './logger';

const app = express();
const routes: Array<CommonRoutesConfig> = [new PartnersRoutes(app)];
/** Server */
const PORT: any = process.env.PORT ?? 6060;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Running Node.js version ${process.version}`);
        logger.info(`App environment: ${process.env.NODE_ENV}`);
        logger.info(`App is running on port ${PORT}`);
        routes.forEach((route) => {
            route.configureRoutes();
        });
    });
}
export default app;
