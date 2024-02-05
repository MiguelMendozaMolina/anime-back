import * as mongoose from 'mongoose';

export const CharacterVoteSchema = new mongoose.Schema(
  {
    characterId: { type: String, required: true },
    voteType: { type: String, enum: ['like', 'dislike'], required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
);
