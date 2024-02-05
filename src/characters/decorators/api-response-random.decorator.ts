import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';

export function ApiResponseRandom(description: string, example?: any) {
  return applyDecorators(
    ApiOperation({ summary: description }),
    SwaggerApiResponse({
      status: 200,
      description,
      content: example
        ? {
            'application/json': {
              example,
            },
          }
        : undefined,
    }),
  );
}
