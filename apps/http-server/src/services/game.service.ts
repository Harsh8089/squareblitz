import { GameMode, GameState, GameStatus, Timer } from '@repo/types/game';
import { ResponseService } from './response.service.js';
import { SquareType } from '@repo/types/square';
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
      correct: 0,
      total: 0,
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
      // save game state in db
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

      game.total = (game.total ?? 0) + 1;
      game.currentTarget = undefined;

      const now = Date.now();
      if (game.timeTaken?.length) {
        game.timeTaken = [...game.timeTaken, now - game.lastMoveTimeTaken!];
      } else {
        game.timeTaken = [now - game.startedAt!];
      }
      game.lastMoveTimeTaken = now;

      if (!isCorrect) {
        return ResponseService.success(
          res,
          200,
          {
            correct: game.correct,
            total: game.total,
            timeTaken: game.timeTaken.at(-1),
            lastMoveCorrect: false,
          },
          RESPONSE_MESSAGE.INCORRECT_SQUARE,
        );
      }

      game.correct = (game.correct ?? 0) + 1;

      return ResponseService.success(
        res,
        200,
        {
          correct: game.correct,
          total: game.total,
          timeTaken: game.timeTaken.at(-1),
          lastMoveCorrect: true,
        },
        RESPONSE_MESSAGE.CORRECT_SQUARE,
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

    // this.save(username, game)

    this.delete(username);

    return ResponseService.success(
      res,
      200,
      { id: game.id },
      RESPONSE_MESSAGE.GAME_DELETED,
    );
  };

  score = (req: Request, res: Response) => {
    const username = (req as any).user;
    const game = this.get(username);
    if (!game) {
      return ResponseService.error(
        res,
        500,
        RESPONSE_MESSAGE.NO_GAME_STATE_FOUND,
      );
    }

    const { correct, total } = game;

    this.delete(username);

    return ResponseService.success(
      res,
      200,
      {
        correct,
        total,
        timeTaken: game.timeTaken,
      },
      '',
    );
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
