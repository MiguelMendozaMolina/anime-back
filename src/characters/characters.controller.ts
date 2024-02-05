import { Body, Controller, Get , NotFoundException, Param, Post } from '@nestjs/common';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { RickAndMortyService } from 'src/rick-and-morty/rick-and-morty.service';
import { SuperheroesService } from 'src/superheroes/superheroes.service';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  private lastServicesUsed: number[] = [];

  constructor(
    private readonly rickAndMortyService: RickAndMortyService,
    private readonly pokemonService: PokemonService,
    private readonly superheroesService: SuperheroesService,
    private readonly charactersService: CharactersService,
  ) {}

  // metodo get
  @Get('random')
  async getRandomCharacter() {
    const services = [
      () => this.rickAndMortyService.getRandomCharacter(),
      () => this.pokemonService.getRandomPokemon(),
      () => this.superheroesService.getRandomSuperhero(),
    ];

    let newIndex;
    if (this.lastServicesUsed.length < 2) {
      // Si no se han utilizado dos servicios distintos, selecciona cualquier servicio excepto el último utilizado.
      do {
        newIndex = Math.floor(Math.random() * services.length);
      } while (this.lastServicesUsed.includes(newIndex));
    } else {
      // Encuentra un servicio que no esté en el array de los últimos servicios utilizados.
      const availableIndexes = [0, 1, 2].filter(
        (index) => !this.lastServicesUsed.includes(index),
      );
      newIndex =
        availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    }

    // Actualiza el registro de los últimos servicios utilizados.
    this.updateLastServicesUsed(newIndex);

    const randomService = services[newIndex];
    const character = await randomService();
    return character;
  }

  // metodo lastvote
  @Get('last-vote')
  async getLastVotedCharacter() {
    const lastVote = await this.charactersService.getLastVote();
    if (!lastVote) {
      throw new NotFoundException('no votes found');
    }
    return lastVote;
  }

  // metodo mostliked
  @Get('most-liked')
  async getMostLikedCharacter() {
    return this.charactersService.getMostLikedCharacter();
  }

  // metodo most-disliked
  @Get('most-disliked')
  async getMostDislikedCharacter() {
    return this.charactersService.getMostDislikedCharacter();
  }

  // method status/:characterName
  @Get('status/:characterName')
  async getStatusForCharacter(@Param('characterName') characterName: string) {
    return this.charactersService.getStatusForCharacter(characterName);
  }

  // metodo post
  @Post('vote')
  async vote(
    @Body()
    voteDto: {
      characterId: string;
      voteType: 'like' | 'dislike';
      imageUrl: string;
    },
  ) {
    return this.charactersService.addVote(
      voteDto.characterId,
      voteDto.voteType,
      voteDto.imageUrl,
    );
  }

  private updateLastServicesUsed(newIndex: number) {
    this.lastServicesUsed.push(newIndex);
    // Asegura que solo se guarden los índices de los dos últimos servicios utilizados.
    if (this.lastServicesUsed.length > 2) {
      this.lastServicesUsed.shift();
    }
  }
}
