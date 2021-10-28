import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import { configureExpressApp } from './source/swagger-config';
import { CommonRoutesConfig } from './source/common/common.routes.config';
import { PartnersRoutes } from './source/routes/partners.routes.config';

const router: Express = express();
const app: express.Application = express();
const routes: Array<CommonRoutesConfig> = [new PartnersRoutes(app)];


/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Configuration */
configureExpressApp(app);

/** RULES OF OUR API */
router.use((req, res, next) => {
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

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;

httpServer.listen(PORT, () => {
    routes.forEach((route) => {
        route.configureRoutes();
    });

    console.log(`Server is running on port: ${PORT}`);
});