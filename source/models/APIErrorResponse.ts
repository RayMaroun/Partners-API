import { ApiModelProperty } from "swagger-express-ts";
import { APIError } from "./APIError";

export class APIErrorResponse {

    @ApiModelProperty({
        description: 'Array of errors',
        required: true,
    })
    errors: APIError[] = [];
}