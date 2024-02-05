import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterVoteSchema } from './characters-vote.schema';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { RickAndMortyModule } from 'src/rick-and-morty/rick-and-morty.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SuperheroesModule } from 'src/superheroes/superheroes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CharacterVote', schema: CharacterVoteSchema },
    ]),
    RickAndMortyModule,
    PokemonModule,
    SuperheroesModule,
  ],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
