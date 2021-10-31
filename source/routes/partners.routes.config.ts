import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import PartnersController from '../controllers/partners.controllers';

export class PartnersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PartnersRoutes');
    }

    configureRoutes() {
        this.app.route(`/api/partners`)
            .get(PartnersController.getPartners);

        this.app.param('partnerId', function (req, res, next, partnerId) {
            next();
        });
        this.app.route(`/api/partners/:partnerId`)
            .get((req, res) => PartnersController.get(req, res));

        return this.app;
    }
}