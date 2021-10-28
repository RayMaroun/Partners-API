import { ApiModelProperty } from "swagger-express-ts";

export class Office {
  
  @ApiModelProperty({
    description: 'Office location',
    required: true,
  })
  location: string = '';

  @ApiModelProperty({
    description: 'Office address',
    required: true,
  })
  address: string = '';

  @ApiModelProperty({
    description: 'Office coordinates',
    required: true,
  })
  coordinates: string = '';

  constructor(location: string, address: string, coordinates: string) {
    this.location = location;
    this.address = address;
    this.coordinates = coordinates;
  }
}
