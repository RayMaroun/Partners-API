import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { IPartnersService } from '../interfaces/IPartnersService';
import { IPartnersRepository } from '../interfaces/IPartnersRepository';
import { PartnersRepository } from '../repository/partner.repository';
import { PartnersService } from '../service/partners.service';


@ApiPath({
  name: 'Partners',
  path: '/partners',
  description: 'Partners endpoint',
})
class PartnersController {
  private partnersService: IPartnersService;
  private partnersRepository: IPartnersRepository;

  constructor() {
    this.partnersRepository = new PartnersRepository();
    this.partnersService = new PartnersService();
    this.getPartners = this.getPartners.bind(this)
    this.get = this.get.bind(this);
  }

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
    },
  })
  public getPartners(req: ExpressRequest, res: ExpressResponse): void {
    const range = req.query.range ? parseInt(req.query.range as string) : 0;
    const coordinates = req.query.coordinates ? req.query.coordinates as string : "0,0";

    const response = this.partnersService.getPartners(range, coordinates);
    res.send(response);
  }

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
      400: { description: 'Bad Request' },
    },
  })
  public get(req: ExpressRequest, res: ExpressResponse): void {
    if (!req.params.partnerId) {
      res.status(400).send();
      return;
    }

    const partner = this.partnersRepository.getPartnerById(parseInt((req.params.partnerId)));
    res.send(partner);
  }
}

export default new PartnersController();