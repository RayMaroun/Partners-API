import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { Office } from './Office';

@ApiModel({
  name: 'Partner',
  description: 'Holds Partner Information',
})
export class Partner {

  @ApiModelProperty({
    description: 'Partner Id',
    required: true,
  })
  id: number = 0;

  @ApiModelProperty({
    description: 'Url name',
    required: true,
  })
  urlName: string = '';

  @ApiModelProperty({
    description: 'Oraganization name',
    required: true,
  })
  organization: string = '';

  @ApiModelProperty({
    description: 'Customer location',
    required: true,
  })
  customerLocations: string = '';

  @ApiModelProperty({
    description: 'Boolean to check if the customer will work remotely',
    required: true,
  })
  willWorkRemotely: boolean = false;

  @ApiModelProperty({
    description: 'Customer website',
    required: true,
  })
  website: string = '';

  @ApiModelProperty({
    description: 'Services offered by the customer',
    required: true,
  })
  services: string = '';
  
  @ApiModelProperty({
    description: 'Array of offices',
    required: true,
  })
  offices: Office[] = [];

  constructor(
    id: number,
    urlName: string,
    organization: string,
    customerLocations: string,
    willWorkRemotely: boolean,
    website: string,
    service: string,
    offices: Office[]
  ) {
    this.id = id;
    this.urlName = urlName;
    this.organization = organization;
    this.customerLocations = customerLocations;
    this.willWorkRemotely = willWorkRemotely;
    this.website = website;
    this.services = service;
    this.offices = offices;
  }
}
