import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { IPartnersService } from '../interfaces/IPartnersService';
import logger from '../../logger';
import { PartnersService } from '../service/partners.service';
import { APIErrorResponse } from '../models/APIErrorResponse';
import { APIError } from '../models/APIError';


@ApiPath({
  name: 'Partners',
  path: '/api/partners',
  description: 'Partners endpoint',
})
class PartnersController {
  private partnersService: IPartnersService;

  constructor() {
    this.partnersService = new PartnersService();
    this.getPartners = this.getPartners.bind(this)
    this.get = this.get.bind(this);
  }
  //#region Get list of partners
  @ApiOperationGet({
    description: 'Gets the list of partners for the given range & coordinates',
    parameters: {
      query: {
        range: {
          required: true,
          name: 'range',
          type: SwaggerDefinitionConstant.Response.Type.NUMBER,
          description: 'Distance between User location and Partner location',
        },
        coordinates: {
          required: true,
          name: 'coordinates',
          description: 'User coordinates',
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        model: 'Partner',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      400: {
        description: 'Bad Request',
        model: "APIErrorResponse",
      },
      500: {
        description: 'Internal Server Error',
        model: "APIErrorResponse",
      },
    },
  })
  public getPartners(req: ExpressRequest, res: ExpressResponse): void {
    let range;
    let coordinates;
    let httpErrors: APIErrorResponse = new APIErrorResponse();
    let APIerror: APIError = new APIError();

    if (!req.query.range && !req.query.coordinates) {
      range = 0;
      coordinates = "0,0";
    }
    else {

      if (!req.query.range || isNaN(Number(req.query.range))) {
        logger.error(`${req.method} ${req.path}: Invalid Range`);
        APIerror.status = "400";
        APIerror.detail = "Invalid Range";
        httpErrors.errors.push(APIerror);
        res.status(400).send(httpErrors);
        return;
      }
      else {
        range = parseInt(req.query.range as string);
      }

      if (!(String(req.query.coordinates).length > 0 && String(req.query.coordinates).indexOf(',') > -1)) {
        logger.error(`${req.method} ${req.path}: Invalid Coordinates`);
        APIerror.status = "400";
        APIerror.detail = "Invalid Coordinates";
        httpErrors.errors.push(APIerror);
        res.status(400).send(httpErrors);
        return;
      }
      else {
        coordinates = String(req.query.coordinates);
      }
    }
    try {

      const response = this.partnersService.getPartners(range, coordinates);
      res.send(response);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`${req.method} ${req.path}: Internal Server Error. ${error.message}`);

        APIerror.status = "500";
        APIerror.detail = error.message;
        httpErrors.errors.push(APIerror);
        res.status(500).send(httpErrors);
        return;
      } else {
        logger.error(`${req.method} ${req.path}: Internal Server Error.`);
        res.status(500).send();
        return;
      }

    }
  }
  //#endregion

  //#region Get partner by id
  @ApiOperationGet({
    description: 'Gets partner by id',
    path: '/{partnerId}',
    parameters: {
      path: {
        partnerId: {
          description: 'Partner Id',
          required: true,
          type: SwaggerDefinitionConstant.Response.Type.NUMBER,
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        model: 'Partner',
      },
      400: {
        description: 'Bad Request',
        model: "APIErrorResponse",
      },
      500: {
        description: 'Internal Server Error',
        model: "APIErrorResponse",
      },
    },
  })
  public get(req: ExpressRequest, res: ExpressResponse): void {
    let httpErrors: APIErrorResponse = new APIErrorResponse();
    let APIerror: APIError = new APIError();

    if (isNaN(Number(req.params.partnerId))) {
      logger.error(`${req.method} ${req.path}: Invalid Partner Id`);
      APIerror.status = "400";
      APIerror.detail = "Invalid Partner Id";
      httpErrors.errors.push(APIerror);
      res.status(400).send(httpErrors);
      return;
    }
    try {
      const partner = this.partnersService.getPartnerById(parseInt((req.params.partnerId)));
      res.send(partner);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`${req.method} ${req.path}: Internal Server Error. ${error.message}`);

        APIerror.status = "500";
        APIerror.detail = error.message;
        httpErrors.errors.push(APIerror);
        res.status(500).send(httpErrors);
        return;
      } else {
        logger.error(`${req.method} ${req.path}: Internal Server Error.`);
        res.status(500).send();
        return;
      }

    }

  }
  //#endregion
}

export default new PartnersController();