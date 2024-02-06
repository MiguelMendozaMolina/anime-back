import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { CharactersModule } from './characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DragonballModule } from './dragonball/dragonball.module';

@Module({
  imports: [
    RickAndMortyModule,
    PokemonModule,
    SuperheroesModule,
    CharactersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DBMONGO_ATLAS_USER}:${process.env.DBMONGO_ATLAS_PASSWORD}@${process.env.DBMONGO_ATLAS_CLUSTER}?retryWrites=true&w=majority`,
      {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
      },
    ),
    DragonballModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
