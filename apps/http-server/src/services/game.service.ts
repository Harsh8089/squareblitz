import { GameMode, GameState, GameStatus, Timer } from '@repo/types/game';
import { ResponseService } from './response.service.js';
import { SquareType } from '@repo/types/square';
import { GameStats } from '@repo/types/stats';
import { BoardSize } from '@repo/types/board';
import { Request, Response } from 'express';

export class GameService {
  private totalActiveGames: number = 0;

  // one to one mapping (username -> game)
  private games: Map<string, GameState> = new Map();

  private set = (username: string) => {
    const game: GameState = {
      id: this.totalActiveGames.toString(),
      status: GameStatus.START,
      startedAt: Date.now(),
    };

    this.games.set(username, game);
    this.totalActiveGames++;
    return game;
  };

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
    const username = (req as any).user;

    const size = Number(req.query.size) as BoardSize;
    const mode = req.query.mode as GameMode;
    const timer = req.query.timer as Timer;

    if (!size || !mode || !timer) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.MISSING_GAME_STATE,
      );
    }

    let game = this.get(username);

    if (!game) {
      game = this.set(username);
    }

    game.filter = {
      size,
      mode,
      timer,
    };

    return ResponseService.success(
      res,
      200,
      {
        game,
      },
      'Game initiated',
    );
  };

  sendSquare = (req: Request, res: Response) => {
    const username = (req as any).user;

    const game = this.get(username);
    if (!game) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.NO_GAME_STATE_FOUND,
      );
    }

    const { size, timer } = game.filter ?? {};
    if (!size || !timer) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.MISSING_GAME_STATE,
      );
    }

    if (game.status !== GameStatus.START) {
      return ResponseService.error(res, 409, RESPONSE_MESSAGE.GAME_NOT_ACTIVE);
    }

    // if (game.currentTarget) {
    //   return ResponseService.error(
    //     res,
    //     409,
    //     RESPONSE_MESSAGE.SQUARE_ALREADY_AWAITING_VERIFICATION,
    //   );
    // }

    const now = Date.now();

    if (now >= game.startedAt! + Number(timer) * 1000) {
      // TODO: save game state in db
      // await this.save(username, game);

      this.delete(username);

      return ResponseService.error(res, 403, RESPONSE_MESSAGE.TIMES_UP);
    }

    const idx = Math.floor(Math.random() * size);
    const target = {
      file: ROWS[idx],
      rank: idx + 1,
    } as SquareType;
    game.currentTarget = target;

    return ResponseService.success(res, 200, { target }, '');
  };

  verifySquare = (req: Request, res: Response) => {
    const username = (req as any).user;
    const game = this.get(username);

    if (!game) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.NO_GAME_STATE_FOUND,
      );
    }

    try {
      const currentTarget = req.body.target as SquareType;

      if (!currentTarget || !game.currentTarget) {
        return ResponseService.error(res, 400, RESPONSE_MESSAGE.TARGET_ERROR);
      }

      const { file, rank } = game.currentTarget;
      const isCorrect =
        currentTarget.file === file && currentTarget.rank === rank;

      const now = Date.now();
      const timeTaken = now - game.lastMoveTimeTaken!;

      const currentClickDetail = {
        timeTaken,
        isCorrect,
      };

      game.clickDetails = game.clickDetails?.length
        ? [...game.clickDetails, currentClickDetail]
        : [currentClickDetail];

      const totalClickDetails = game.clickDetails.length;

      game.currentTarget = undefined;
      game.lastMoveTimeTaken = now;

      return ResponseService.success(
        res,
        200,
        {
          correct: isCorrect,
          total: totalClickDetails,
          timeTaken,
          lastMoveCorrect: isCorrect,
        },
        isCorrect
          ? RESPONSE_MESSAGE.CORRECT_SQUARE
          : RESPONSE_MESSAGE.INCORRECT_SQUARE,
      );
    } catch (error) {
      return ResponseService.error(res, 500, '', error as any);
    }
  };

  end = (req: Request, res: Response) => {
    const username = (req as any).user;

    const game = this.get(username);
    if (!game) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.NO_GAME_STATE_FOUND,
      );
    }
    // TODO
    // this.save(username, game)

    this.delete(username);

    return ResponseService.success(
      res,
      200,
      { id: game.id },
      RESPONSE_MESSAGE.GAME_DELETED,
    );
  };

  stats = (req: Request, res: Response) => {
    const { id } = req.params;

    // TODO: get game details from db
    // const game = await prisma.games.findOne({ id })

    return ResponseService.success(res, 200, { details: mockGameStats }, '');
  };

  cleanUp() {
    const now = Date.now();

    for (const [username, state] of this.games.entries()) {
      if (now - state.startedAt! > THIRTY_MINUTES) {
        this.delete(username);
      }
    }
  }
}

const MAX_ROW_LENGTH = 8;

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

// TODO: cleanup mock data
const mockGameStats: GameStats = {
  id: '0',
  filter: {
    size: 4,
    mode: GameMode.BLIND,
    timer: '15',
  },
  clickDetails: [
    {
      timeTaken: 2500,
      isCorrect: true,
    },
    {
      timeTaken: 1467,
      isCorrect: false,
    },
    {
      timeTaken: 450,
      isCorrect: true,
    },
    {
      timeTaken: 342,
      isCorrect: false,
    },
    {
      timeTaken: 1234,
      isCorrect: true,
    },
    {
      timeTaken: 2321,
      isCorrect: true,
    },
    {
      timeTaken: 1321,
      isCorrect: false,
    },
    {
      timeTaken: 1000,
      isCorrect: true,
    },
    {
      timeTaken: 342,
      isCorrect: true,
    },
    {
      timeTaken: 612,
      isCorrect: false,
    },
    {
      timeTaken: 2321,
      isCorrect: true,
    },
    {
      timeTaken: 1321,
      isCorrect: false,
    },
    {
      timeTaken: 1000,
      isCorrect: true,
    },
    {
      timeTaken: 1223,
      isCorrect: true,
    },
    {
      timeTaken: 2123,
      isCorrect: false,
    },
    {
      timeTaken: 2321,
      isCorrect: true,
    },
    {
      timeTaken: 1321,
      isCorrect: false,
    },
    {
      timeTaken: 1000,
      isCorrect: true,
    },
    {
      timeTaken: 342,
      isCorrect: true,
    },
    {
      timeTaken: 612,
      isCorrect: false,
    },
  ],
};
