import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class RickAndMortyService {
  async getRandomCharacter(): Promise<any> {
    const totalCharacters = 671; // Número total de personajes, puede variar
    const randomId = Math.floor(Math.random() * totalCharacters) + 1;
    const rickandmortyApiBaseUrl = process.env.RICKANDMORTY_BASE_URL;
    const url = `${rickandmortyApiBaseUrl}${randomId}`;
    const response = await axios.get(url);

    return {
      name: response.data.name,
      image: response.data.image,
    };
  }
}
