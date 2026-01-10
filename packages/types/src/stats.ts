import { GameState } from './game';

export type GameStats = Omit<
  GameState,
  'status' | 'currentTarget' | 'lastMoveCorrect' | 'lastMoveTimeTaken'
>;
