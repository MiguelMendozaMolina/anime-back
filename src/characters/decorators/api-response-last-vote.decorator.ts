import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';

export function ApiResponseLastVote(description: string, lastVoteData?: any) {
  return applyDecorators(
    ApiOperation({ summary: description }),
    SwaggerApiResponse({
      status: 200,
      description,
      content: {
        'application/json': {
          example: lastVoteData || {},
        },
      },
    }),
  );
}
