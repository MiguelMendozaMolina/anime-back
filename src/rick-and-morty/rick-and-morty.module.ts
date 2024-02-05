import { Module } from '@nestjs/common';
import { RickAndMortyService } from './rick-and-morty.service';

@Module({
  providers: [RickAndMortyService],
  exports: [RickAndMortyService],
})
export class RickAndMortyModule {}
