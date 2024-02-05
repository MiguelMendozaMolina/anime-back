import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class PokemonService {
  async getRandomPokemon(): Promise<any> {
    const totalPokemon = 898; // Este número debe actualizarse según la PokeAPI
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    const pokeApiBaseUrl = process.env.POKEAPI_BASE_URL;
    const url = `${pokeApiBaseUrl}${randomId}`;
    const response = await axios.get(url);

    const image = response.data.sprites.other['official-artwork'].front_default;
    return {
      name: response.data.name,
      image: image || response.data.sprites.front_default,
    };
  }
}
