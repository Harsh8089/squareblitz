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

  // TODO: remove once db implementation is done
  private prevGame: GameState | null = null;

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

  private getUsername(req: Request): string {
    const username = req.user;
    if (!username) {
      throw new UnauthorizedError();
    }

    return username;
  }

  private getGameOrThrow(username: string): GameState {
    const game = this.get(username);
    if (!game) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }
    return game;
  }

  private parseFilter(query: any) {
    const { size, mode, timer } = query || {};

    if (!size || !mode || !timer) {
      throw new NotFoundError(RESPONSE_MESSAGE.MISSING_GAME_STATE);
    }

    return {
      size: Number(size) as BoardSize,
      mode: mode as GameMode,
      timer: timer as Timer,
    };
  }

  private getTarget(size: BoardSize): Square {
    const file = String.fromCharCode(97 + Math.floor(Math.random() * size));
    const rank = Math.floor(Math.random() * size) + 1;

    return { file, rank } as Square;
  }

  start = (req: Request, res: Response) => {
    const username = this.getUsername(req);
    const filter = this.parseFilter(req.query);

    let game = this.get(username);
    if (!game) {
      game = this.set(username);
    }

    game.filter = filter;

    return ResponseService.success<GameData>(
      res,
      200,
      {
        id: game.id,
        status: game.status,
        startedAt: game.startedAt,
        filter: game.filter,
      },
      RESPONSE_MESSAGE.GAME_INITIATED,
    );
  };

  send = (req: Request, res: Response) => {
    const username = this.getUsername(req);
    const game = this.getGameOrThrow(username);

    const { size } = game.filter ?? {};
    if (!size) {
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

    const targetSquare = this.getTarget(size);

    game.moves?.push({
      id: game.moves.length,
      targetSquare,
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
    const username = this.getUsername(req);
    const game = this.getGameOrThrow(username);

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

    this.prevGame = game;
    this.delete(username);

    return ResponseService.success<GameState>(
      res,
      200,
      { id: game.id, status: game.status },
      RESPONSE_MESSAGE.GAME_DELETED,
    );
  };

  reset = (req: Request, res: Response) => {
    const username = this.getUsername(req);
    const game = this.getGameOrThrow(username);

    const { size } = game.filter ?? {};
    if (!size) {
      throw new NotFoundError(RESPONSE_MESSAGE.MISSING_GAME_STATE);
    }

    const targetSquare = this.getTarget(size);
    const move = {
      id: 0,
      targetSquare,
      timeStamp: Date.now(),
    };
    game.moves = [move];

    return ResponseService.success<GameData>(
      res,
      200,
      {
        id: game.id,
        status: GameStatus.ACTIVE,
        startedAt: Date.now(),
        moves: game.moves,
      },
      RESPONSE_MESSAGE.GAME_RESET,
    );
  };

  stats = (req: Request, res: Response) => {
    const { id } = req.params;

    // TODO: get game details from db
    // const game = await prisma.games.findOne({ id })

    const gameStats = prepareGameStats(this.prevGame);

    if (!gameStats) {
      throw new NotFoundError(RESPONSE_MESSAGE.NO_GAME_STATE_FOUND);
    }

    this.prevGame = null;

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

const THIRTY_MINUTES = 30 * 60 * 1000;

const enum RESPONSE_MESSAGE {
  GAME_INITIATED = 'Game started successfully',
  MISSING_GAME_STATE = 'Missing some game state',
  NO_GAME_STATE_FOUND = 'No game state found',
  GAME_NOT_ACTIVE = 'Game not active',
  CORRECT_SQUARE = 'Correct square',
  INCORRECT_SQUARE = 'Incorrect square',
  TARGET_ERROR = 'Missing target or previous target not set',
  GAME_DELETED = 'Game deleted',
  SQUARE_ALREADY_AWAITING_VERIFICATION = 'A square is already awaiting verification',
  GAME_RESET = 'Game has been reset',
}
