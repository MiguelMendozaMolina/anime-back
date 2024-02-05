import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsEnum,
  IsMongoId,
  ValidateIf,
} from 'class-validator';

enum VoteType {
  Like = 'like',
  Dislike = 'dislike',
}

export class CharacterResponse {
  @ApiPropertyOptional({ example: '65c0f4cf1fbbf8659fe37a4b' })
  @IsMongoId()
  readonly _id?: string;

  @ApiProperty({ example: 'decidueye' })
  @IsString()
  @ValidateIf((o) => o.characterId !== undefined)
  @IsNotEmpty()
  readonly characterId?: string;

  @ApiPropertyOptional({ example: 'like', enum: VoteType })
  @IsEnum(VoteType)
  @ApiPropertyOptional({
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png',
  })
  @IsUrl()
  @ValidateIf((o) => o.imageUrl !== undefined)
  readonly imageUrl?: string;

  @ApiPropertyOptional({ example: '2024-02-05T14:46:39.234Z' })
  @IsString()
  @ValidateIf((o) => o.createdAt !== undefined)
  readonly createdAt?: string;

  @ApiPropertyOptional({ example: '2024-02-05T14:46:39.234Z' })
  @IsString()
  @ValidateIf((o) => o.updatedAt !== undefined)
  readonly updatedAt?: string;
}
