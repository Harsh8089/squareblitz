import { File, Rank, SquareType } from "@repo/types/square";

const FILES = Array.from({ length: 16 }, (_, i) => String.fromCharCode(i + 97));

const getTarget = (size: number): SquareType => ({
  file: FILES[Math.floor(Math.random() * size)] as File,
  rank: (Math.floor(Math.random() * size) + 1) as Rank
});

const isSameSquare = (a: SquareType, b: SquareType): boolean => 
  a.file === b.file && a.rank === b.rank;

const mapSizeToPx = (size: number): number => 
  135 - ((size - 4) * 40) / 6;

export {
  FILES,
  getTarget,
  isSameSquare,
  mapSizeToPx
};