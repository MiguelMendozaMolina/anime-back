import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
