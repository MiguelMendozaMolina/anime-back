import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterVote } from './character-vote.interface';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel('CharacterVote')
    private characterVoteModel: Model<CharacterVote>,
  ) {}
  async addVote(
    characterId: string,
    voteType: 'like' | 'dislike',
    imageUrl: string,
  ): Promise<CharacterVote> {
    const newVote = new this.characterVoteModel({
      characterId,
      voteType,
      imageUrl,
    });
    return newVote.save();
  }
  async getLastVote(): Promise<CharacterVote> {
    return this.characterVoteModel.findOne().sort({ createdAt: -1 }).exec();
  }

  async getMostLikedCharacter(): Promise<any> {
    const aggregation = await this.characterVoteModel.aggregate([
      { $match: { voteType: 'like' } }, // Filtra solo los documentos con "like"
      {
        $group: {
          _id: '$characterId', // Agrupa por characterId
          count: { $sum: 1 }, // Cuenta los "likes"
          imageUrl: { $first: '$imageUrl' } // Toma la URL de la imagen del primer documento encontrado
        },
      },
      { $sort: { count: -1 } }, // Ordena por count en orden descendente
      { $limit: 1 }, // Limita a 1 resultado para obtener el más "likeado"
    ]);

    if (aggregation.length === 0) {
      return null; // Retorna null si no se encuentra ningún "like"
    }

    const mostLiked = aggregation[0];
    // Asegura devolver un objeto con la estructura deseada
    return {
      characterId: mostLiked._id,
      count: mostLiked.count,
      imageUrl: mostLiked.imageUrl, // Incluye la imageUrl en la respuesta
    };
  }

  async getMostDislikedCharacter(): Promise<any> {
    const aggregation = await this.characterVoteModel.aggregate([
      { $match: { voteType: 'dislike' } },
      {
        $group: {
          _id: '$characterId',
          count: { $sum: 1 },
          imageUrl: { $first: '$imageUrl' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (aggregation.length === 0) {
      return null;
    }

    const mostDisliked = aggregation[0];
    // Asegúrate de que imageUrl está siendo recogido correctamente
    return {
      characterId: mostDisliked._id,
      count: mostDisliked.count,
      imageUrl: mostDisliked.imageUrl,
    };
  }

  async getStatusForCharacter(characterName: string): Promise<any> {
    const caseInsensitiveName = new RegExp(`^${characterName}$`, 'i');

    // Agrega la obtención de la primera imageUrl encontrada para el personaje.
    const aggregation = await this.characterVoteModel.aggregate([
      { $match: { characterId: caseInsensitiveName } },
      {
        $group: {
          _id: '$characterId',
          totalLikes: {
            $sum: { $cond: [{ $eq: ['$voteType', 'like'] }, 1, 0] }
          },
          totalDislikes: {
            $sum: { $cond: [{ $eq: ['$voteType', 'dislike'] }, 1, 0] }
          },
          imageUrl: { $first: '$imageUrl' } // Asume que todas las entradas para un personaje tienen la misma URL de imagen.
        },
      },
    ]);

    if (aggregation.length > 0) {
      const result = aggregation[0];
      return {
        characterName: result._id, // O simplemente usa characterName si prefieres.
        totalLikes: result.totalLikes,
        totalDislikes: result.totalDislikes,
        imageUrl: result.imageUrl, // Incluye la imageUrl en la respuesta.
      };
    } else {
      // Retorna un objeto con ceros y sin imagen si no se encuentra el personaje.
      return {
        characterName: characterName,
        totalLikes: 0,
        totalDislikes: 0,
        imageUrl: '', // O un valor predeterminado o nulo si prefieres.
      };
    }
  }
}
