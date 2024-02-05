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
    _id?: string,
    characterId?: string,
    voteType?: 'like' | 'dislike',
    imageUrl?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Promise<CharacterVote> {
    const newVote = new this.characterVoteModel({
      _id,
      characterId,
      voteType,
      imageUrl,
      createdAt,
      updatedAt,
    });
    return newVote.save();
  }
  async getLastVote(): Promise<CharacterVote> {
    return this.characterVoteModel.findOne().sort({ createdAt: -1 }).exec();
  }

  async getMostLikedCharacter(): Promise<any> {
    const aggregation = await this.characterVoteModel.aggregate([
      { $match: { voteType: 'like' } }, // Filter only documents with "like"
      {
        $group: {
          _id: '$characterId', // Group by characterId
          count: { $sum: 1 }, // Count the "likes"
          imageUrl: { $first: '$imageUrl' }, // Takes the image URL of the first found document
        },
      },
      { $sort: { count: -1 } }, // Sort by count in descending order
      { $limit: 1 }, // Limits to 1 result to get the most "liked"
    ]);

    if (aggregation.length === 0) {
      return null; // Returns null if no "like" is found
    }

    const mostLiked = aggregation[0];
    // Ensures returning an object with the desired structure
    return {
      characterId: mostLiked._id,
      count: mostLiked.count,
      imageUrl: mostLiked.imageUrl, // Includes the imageUrl in the response
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
    // Ensure imageUrl is correctly captured
    return {
      characterId: mostDisliked._id,
      count: mostDisliked.count,
      imageUrl: mostDisliked.imageUrl,
    };
  }

  async getStatusForCharacter(characterName: string): Promise<any> {
    const caseInsensitiveName = new RegExp(`^${characterName}$`, 'i');

    // Adds fetching the first found imageUrl for the character.
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
          imageUrl: { $first: '$imageUrl' } // Assumes all entries for a character have the same image URL.
        },
      },
    ]);

    if (aggregation.length > 0) {
      const result = aggregation[0];
      return {
        characterName: result._id, // Or simply use characterName if you prefer.
        totalLikes: result.totalLikes,
        totalDislikes: result.totalDislikes,
        imageUrl: result.imageUrl, // Includes the imageUrl in the response.
      };
    } else {
      // Returns an object with zeros and no image if the character is not found.
      return {
        characterName: characterName,
        totalLikes: 0,
        totalDislikes: 0,
        imageUrl: '', // Or a default or null value if preferred.
      };
    }
  }
}
