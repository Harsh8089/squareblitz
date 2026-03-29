import {
  AppError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errorHandler.utils.js';
import {
  BoardSize,
  GameMode,
  GameState,
  GameStats,
  GameStatus,
  Move,
  Timer,
} from '@repo/types/game';
import { prepareGameStats } from '../utils/gameStats.utils.js';
import { ResponseService } from './response.service.js';
import { GameData } from '@repo/types/response';
import { Square } from '@repo/types/square';
import { Request, Response } from 'express';

export class GameService {
  private static instance: GameService;

  private totalActiveGames: number = 0;

  // one to one mapping (username -> game)
  private games: Map<string, GameState> = new Map();

  private constructor() {}

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  private set = (username: string) => {
    const game: GameState = {
      id: this.totalActiveGames.toString(),
      status: GameStatus.ACTIVE,
      startedAt: Date.now(), // epoch time format
      moves: [],
    };

    this.games.set(username, game);
    this.totalActiveGames++;
    return game;
  };

  // TODO: Fix Assumption: 1 player will have 1 game at a time
  private get = (username: string) => this.games.get(username);

  private delete = (username: string) => {
    this.games.delete(username);

    this.totalActiveGames--;
    if (this.totalActiveGames < 0) this.totalActiveGames = 0;
  };

  // TODO
  private save = (username: string, game: GameState) => {
    try {
      // await prisma.games.create()
    } catch (error) {}
  };

  start = (req: Request, res: Response) => {
    const username = req.user;
    if (!username) {
      throw new UnauthorizedError();
    }

    const { size, mode, timer } = req.query || {};

    if (!size || !mode || !timer) {
      throw new NotFoundError(RESPONSE_MESSAGE.MISSING_GAME_STATE);
    }

    let game = this.get(username);

    if (!game) {
      game = this.set(username);
    }

    game.filter = {
      size: Number(size) as BoardSize,
      mode: mode as GameMode,
      timer: timer as Timer,
    };

    return ResponseService.success<GameState>(
      res,
      200,
      {
        id: game.id,
        status: game.status,
        startedAt: game.startedAt,
        filter: game.filter,
      },
      'Game initiated',
    );
  };

  send = (req: Request, res: Response) => {
    const username = req.user;
    if (!username) {
      throw new UnauthorizedError();
    }

    const game = this.get(username);
    if (!game) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }

    const { size, timer } = game.filter ?? {};
    if (!size || !timer) {
      throw new NotFoundError(RESPONSE_MESSAGE.MISSING_GAME_STATE);
    }

    if (game.status !== GameStatus.ACTIVE) {
      throw new BadRequestError(RESPONSE_MESSAGE.GAME_NOT_ACTIVE);
    }

    // TODO: Fixme from FE
    // if (game.moves.at(-1).clickedSquare === undefined) {
    //   return ResponseService.error(
    //     res,
    //     409,
    //     RESPONSE_MESSAGE.SQUARE_ALREADY_AWAITING_VERIFICATION,
    //   );
    // }

    // TODO: Need to sync with FE timer. Right now BE time is slightly ahead of FE
    const now = Date.now();
    if (now >= game.startedAt! + Number(timer) * 1000) {
      // TODO: save game state in db
      // await this.save(username, game);

      this.delete(username);

      throw new AppError(RESPONSE_MESSAGE.TIMES_UP, 403);
    }

    const idx = Math.floor(Math.random() * size);
    const target = {
      file: ROWS[idx],
      rank: idx + 1,
    } as Square;

    game.moves?.push({
      targetSquare: target,
      timeStamp: Date.now(),
    });

    return ResponseService.success<GameData>(
      res,
      200,
      {
        id: game.id,
        target: game.moves?.at(-1),
        status: game.status,
      },
      '',
    );
  };

  verify = (req: Request, res: Response) => {
    const username = req.user;
    if (!username) {
      throw new UnauthorizedError();
    }

    const game = this.get(username);
    if (!game) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }

    const clickedSquare = req.body.target as Square;

    const {
      targetSquare,
      timeStamp,
      clickedSquare: lastClickedSquare,
    } = game.moves?.at(-1) || {};
    if (
      !game.moves?.length ||
      !targetSquare ||
      !clickedSquare ||
      !timeStamp ||
      lastClickedSquare
    ) {
      throw new BadRequestError(RESPONSE_MESSAGE.TARGET_ERROR);
    }

    const { file, rank } = targetSquare;
    const isCorrect =
      clickedSquare.file === file && clickedSquare.rank === rank;

    const now = Date.now();
    const timeTaken = now - timeStamp;

    const lastIndex = game.moves.length - 1;
    game.moves[lastIndex] = {
      ...game.moves[lastIndex],
      clickedSquare,
      timeTaken,
      isCorrect,
    } as Move;

    return ResponseService.success<GameData>(
      res,
      200,
      {
        id: game.id,
        move: game.moves[lastIndex],
        status: game.status,
      },
      isCorrect
        ? RESPONSE_MESSAGE.CORRECT_SQUARE
        : RESPONSE_MESSAGE.INCORRECT_SQUARE,
    );
  };

  end = (req: Request, res: Response) => {
    const username = req.user;
    const { status } = req.body;

    if (!username) {
      throw new UnauthorizedError();
    }

    const game = this.get(username);
    if (!game) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }
    game.status = status;

    // TODO
    // this.save(username, game)
    // this.delete(username);

    return ResponseService.success<GameState>(
      res,
      200,
      { id: game.id, status: game.status },
      RESPONSE_MESSAGE.GAME_DELETED,
    );
  };

  stats = (req: Request, res: Response) => {
    const username = req.user;
    const { id } = req.params;

    // TODO: get game details from db
    // const game = await prisma.games.findOne({ id })

    if (!username) {
      throw new UnauthorizedError();
    }

    const game = this.get(username);
    const gameStats = prepareGameStats(game);

    if (!gameStats) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }

    // TODO: remove below code
    this.delete(username);

    return ResponseService.success<GameStats>(res, 200, gameStats, '');
  };

  // TODO: Setup cron job to call cleanup()
  cleanUp() {
    const now = Date.now();

    for (const [username, state] of this.games.entries()) {
      if (now - state.startedAt! > THIRTY_MINUTES) {
        this.delete(username);
      }
    }
  }
}

const MAX_ROW_LENGTH = 10;

const ROWS = Array.from({ length: MAX_ROW_LENGTH }, (_, r) =>
  String.fromCharCode(r + 97),
);

const THIRTY_MINUTES = 30 * 60 * 1000;

const enum RESPONSE_MESSAGE {
  MISSING_GAME_STATE = 'Missing some game state',
  NO_GAME_STATE_FOUND = 'No game state found',
  GAME_NOT_ACTIVE = 'Game not active',
  TIMES_UP = 'Times up!',
  CORRECT_SQUARE = 'Correct sqaure',
  INCORRECT_SQUARE = 'Incorrect square',
  TARGET_ERROR = 'Missing target or previous target not set',
  GAME_DELETED = 'Game deleted',
  SQUARE_ALREADY_AWAITING_VERIFICATION = 'A square is already awaiting verification',
}
