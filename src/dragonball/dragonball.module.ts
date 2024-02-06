import { Module } from '@nestjs/common';
import { DragonBallService } from './dragonball.service';

@Module({
  providers: [DragonBallService],
  exports: [DragonBallService],
})
export class DragonballModule {}
