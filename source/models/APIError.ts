import { ApiModelProperty } from "swagger-express-ts";

export class APIError {

    @ApiModelProperty({
        description: 'Error Status',
        required: true,
    })
    status: string = '';

    @ApiModelProperty({
        description: 'Error Details',
        required: true,
    })
    detail: string = '';
}