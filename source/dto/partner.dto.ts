import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  name: 'PartnerDTO',
  description: 'Holds partner basic information',
})
export class PartnerDTO {

  @ApiModelProperty({
    description: 'Partner Id',
    required: true,
  })
  id: number = 0;

  @ApiModelProperty({
    description: 'Oraganization name',
    required: true,
  })
  organization: string = '';

  @ApiModelProperty({
    description: 'Partner location',
    required: true,
  })
  locations: string = '';

  @ApiModelProperty({
    description: 'Distance between user and partner',
    required: true,
  })
  ranges: string = '';
}