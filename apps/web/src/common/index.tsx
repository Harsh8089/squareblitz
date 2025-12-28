import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
  Clock12,
  Clock3,
  Clock6,
  Clock9,
  EyeOff,
  Eye,
} from 'lucide-react';

const CHESS_PIECES_ICONS = [
  <ChessBishop />,
  <ChessKing />,
  <ChessKnight />,
  <ChessPawn />,
  <ChessQueen />,
  <ChessRook />,
];

const TIMER_ICONS = [<Clock12 />, <Clock3 />, <Clock6 />, <Clock9 />];

const VARIANT_ICONS = [<EyeOff />, <Eye />];

export { CHESS_PIECES_ICONS, TIMER_ICONS, VARIANT_ICONS };
