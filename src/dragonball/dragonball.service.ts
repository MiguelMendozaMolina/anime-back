import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class DragonBallService {
  async getRandomDragonBall(): Promise<any> {
    const totalCharacters = 58;
    const randomId = Math.floor(Math.random() * totalCharacters) + 1;
    const dragonBallApiBaseUrl = 'https://dragonball-api.com/api/characters/';
    const url = `${dragonBallApiBaseUrl}${randomId}`;
    const response = await axios.get(url);

    return {
      name: response.data.name,
      image: response.data.image,
    };
  }
}
