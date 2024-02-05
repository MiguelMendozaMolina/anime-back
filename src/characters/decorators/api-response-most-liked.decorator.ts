import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';

export function ApiResponseMostLiked(description: string, mostLikedData?: any) {
  return applyDecorators(
    ApiOperation({ summary: description }),
    SwaggerApiResponse({
      status: 200,
      description,
      content: {
        'application/json': {
          example: mostLikedData || {},
        },
      },
    }),
  );
}
