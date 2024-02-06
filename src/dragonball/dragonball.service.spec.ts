import { Test, TestingModule } from '@nestjs/testing';
import { DragonballService } from './dragonball.service';

describe('DragonballService', () => {
  let service: DragonballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonballService],
    }).compile();

    service = module.get<DragonballService>(DragonballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
