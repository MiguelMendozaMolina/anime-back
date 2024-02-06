import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { DragonBallService } from 'src/dragonball/dragonball.service';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { RickAndMortyService } from 'src/rick-and-morty/rick-and-morty.service';
import { SuperheroesService } from 'src/superheroes/superheroes.service';
import { CharactersService } from './characters.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseRandom } from './decorators/api-response-random.decorator';
import { ApiResponseLastVote } from './decorators/api-response-last-vote.decorator';
import { CharacterResponse } from './dtos/character-response.dto';
import { ApiResponseMostLiked } from './decorators/api-response-most-liked.decorator';
import { ApiResponseMostDisliked } from './decorators/api-response-most-disliked.decorator';
import { ApiResponseStatusForCharacter } from './decorators/api-response-status-for-character.decorator';

@Controller('characters')
export class CharactersController {
  private lastServicesUsed: number[] = [];

  constructor(
    private readonly rickAndMortyService: RickAndMortyService,
    private readonly dragonBallService: DragonBallService,
    private readonly pokemonService: PokemonService,
    private readonly superheroesService: SuperheroesService,
    private readonly charactersService: CharactersService,
  ) {}

  // method random
  @ApiTags('Characters')
  @Get('random')
  @ApiOperation({ summary: 'Obtain a random character' })
  @ApiResponseRandom('Ok', {
    name: 'Little Dipper',
    image: 'https://rickandmortyapi.com/api/character/avatar/205.jpeg',
  })
  async getRandomCharacter() {
    const services = [
      () => this.rickAndMortyService.getRandomCharacter(),
      () => this.dragonBallService.getRandomDragonBall(),
      () => this.pokemonService.getRandomPokemon(),
      () => this.superheroesService.getRandomSuperhero(),
    ];

    const serviceIndexes = services.map((_, index) => index);
    const mixedIndexes = serviceIndexes.sort(() => Math.random() - 0.5);

    for (const index of mixedIndexes) {
      try {
        const character = await services[index]();
        if (character) {
          this.updateLastServicesUsed(index);
          return character;
        }
      } catch (error) {
        console.error(
          `Error fetching character from service at index ${index}:`,
          error,
        );
        // An error is not thrown here to allow the loop to continue with the next service
      }
    }

    // If all services fail, throw an exception
    throw new NotFoundException(
      'Unable to fetch a character from any service.',
    );
  }

  // method lastvote
  @ApiTags('Characters')
  @Get('last-vote')
  @ApiOperation({ summary: 'Obtain the last voted character' })
  @ApiResponseLastVote('Ok', {
    _id: '65c10c9f6c6a65f2421bc640',
    characterId: 'Mogo',
    voteType: 'dislike',
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1432.jpg',
    createdAt: '2024-02-05T16:28:15.562Z',
    updatedAt: '2024-02-05T16:28:15.562Z',
    __v: 0,
  })
  async getLastVotedCharacter(): Promise<CharacterResponse> {
    const lastVote = await this.charactersService.getLastVote();
    if (!lastVote) {
      throw new NotFoundException('no votes found');
    }
    return lastVote;
  }

  // method mostliked
  @ApiTags('Characters')
  @Get('most-liked')
  @ApiOperation({ summary: 'Obtain the most liked character' })
  @ApiResponseMostLiked('Ok', {
    characterId: 'decidueye',
    count: 11,
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png',
  })
  async getMostLikedCharacter(): Promise<CharacterResponse> {
    return this.charactersService.getMostLikedCharacter();
  }

  // method most-disliked
  @ApiTags('Characters')
  @Get('most-disliked')
  @ApiOperation({ summary: 'Obtain the most disliked character' })
  @ApiResponseMostDisliked('Ok', {
    characterId: 'Crimson Crusader',
    count: 6,
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/303.jpg',
  })
  async getMostDislikedCharacter(): Promise<CharacterResponse> {
    return this.charactersService.getMostDislikedCharacter();
  }

  // method status/:characterName
  @ApiTags('Characters')
  @Get('status/:characterName')
  @ApiOperation({ summary: 'Obtain the status for a character by name' })
  @ApiResponseStatusForCharacter('Ok', {
    type: 'object',
    properties: {
      characterName: { type: 'string' },
      totalLikes: { type: 'integer' },
      totalDislikes: { type: 'integer' },
      imageUrl: { type: 'string' },
    },
  })
  async getStatusForCharacter(
    @Param('characterName') characterName: string,
  ): Promise<CharacterResponse> {
    return this.charactersService.getStatusForCharacter(characterName);
  }

  // method post
  @ApiTags('Characters')
  @Post('vote')
  @ApiBody({
    description: 'Generate new vote',
    required: true,
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          characterId: 'decidueye',
          voteType: 'like',
          imageUrl:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Vote added successfully',
    content: {
      'application/json': {
        example: {
          _id: 'your_generated_id_here',
          characterId: 'decidueye',
          voteType: 'like',
          imageUrl:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  })
  async vote(
    @Body()
    voteDto: {
      _id?: string;
      characterId: string;
      voteType: 'like' | 'dislike';
      imageUrl: string;
      createdAt?: Date;
      updatedAt?: Date;
    },
  ) {
    return this.charactersService.addVote(
      voteDto._id,
      voteDto.characterId,
      voteDto.voteType,
      voteDto.imageUrl,
      voteDto.createdAt,
      voteDto.updatedAt,
    );
  }

  private updateLastServicesUsed(newIndex: number) {
    this.lastServicesUsed.push(newIndex);
    // Ensure that only the indices of the last three services used are saved.
    if (this.lastServicesUsed.length > 3) {
      this.lastServicesUsed.shift();
    }
  }
}
