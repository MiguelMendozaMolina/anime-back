export interface CharacterVote {
  id?: string;
  characterId: string;
  voteType: 'like' | 'dislike';
}
