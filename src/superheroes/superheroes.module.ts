import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';

@Module({
  providers: [SuperheroesService],
  exports: [SuperheroesService],
})
export class SuperheroesModule {}
