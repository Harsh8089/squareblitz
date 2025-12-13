import { SquareType } from "@repo/types/square";
import { Request, Response } from "express";
import { ResponseService } from "./response.service.js";

type GameState = {
  correct: number;
  incorrect: number;
  lastTarget?: SquareType;
  startedAt: number;
};

export class GameService {
  private games: Map<string, GameState> = new Map();

  private set = (username: string) => {
    const game = {
      correct: 0,
      incorrect: 0,
      startedAt: new Date().getTime()
    };

    this.games.set(username, game);

    return game;
  }
  
  private get = (username: string) => 
    this.games.get(username);

  start = (req: Request, res: Response) => {
    const username = (req as any).user;
    let game = this.get(username);

    if(!game) {
      game = this.set(username);
    }

    return ResponseService.success(res, 200, { 
      startedAt: game?.startedAt 
    }, "Game initiated"); 
  }

  sendSquare = (req: Request, res: Response) => {
    const username = (req as any).user;
    const size = Number(req.query.size);

    const game = this.get(username);

    if(!game || !size) {
      return ResponseService.error(res, 500, "No game state found");
    }

    if(game.lastTarget) {
      return ResponseService.error(res, 409, "A square is already awaiting verification");
    }

    const target = {
      file: ROWS[Math.floor(Math.random() * size)],
      rank: Math.floor(Math.random() * size) + 1
    } as SquareType;

    game.lastTarget = target;
    return ResponseService.success(res, 200, { target }, "");
  }

  verifySquare = (req: Request, res: Response) => {
    const username = (req as any).user;
    const game = this.get(username);
    if(!game) {
      return ResponseService.error(res, 500, "No game state found");
    }

    try {
      const currentTarget = req.body.target as SquareType;
      if(!currentTarget || !game.lastTarget) {
        return ResponseService.error(
          res, 
          400, 
          "Missing target or previous target not set"
        );
      }

      const { file, rank } = game.lastTarget;

      const isCorrect =
      currentTarget.file === file &&
      currentTarget.rank === rank;

      if (!isCorrect) {
        game.incorrect++;
        return ResponseService.error(res, 400, "Incorrect square");
      }

      game.correct++;
      game.lastTarget = undefined;
      return ResponseService.success(res, 200, {}, "Correct square");
    } catch (error) {
      return ResponseService.error(res, 500, "", error as any);
    }
  }

  score = (req: Request, res: Response) => {
    const username = (req as any).user;
    const game = this.get(username);
    if(!game) {
      return ResponseService.error(res, 500, "No game state found");
    }

    return ResponseService.success(res, 200, { 
      correct: game.correct, 
      incorrect: game.incorrect 
    }, "");
  }

  cleanUp() {
    const now = new Date().getTime();

    for(const [username, state] of this.games.entries()) {
      if(now - state.startedAt > THIRTY_MINUTES) {
        this.games.delete(username);
      }
    }
  }
}

const MAX_ROW_LENGTH = 8;

const ROWS = Array.from(
  { length: MAX_ROW_LENGTH }, (_, r) => String.fromCharCode(r + 97)
);

const THIRTY_MINUTES = 30 * 60 * 1000;