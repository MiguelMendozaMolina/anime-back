import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class SuperheroesService {
  private apiKey = process.env.SUPEHEROES_TOKEN;
  private baseUrl = process.env.SUPERHEROES_BASE_URL;

  async getRandomSuperhero(): Promise<any> {
    const totalSuperheroes = 731; // La Superhero API tiene datos para 731 superhéroes y villanos
    const randomId = Math.floor(Math.random() * totalSuperheroes) + 1;
    const url = `${this.baseUrl}${this.apiKey}/${randomId}`;
    const response = await axios.get(url);
    return {
      name: response.data.name,
      image: response.data.image.url,
    };
  }
}
