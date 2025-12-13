import { SquareType } from "@repo/types/square";
import { GameMode, GameState, GameStatus, Timer } from "@repo/types/game";
import { Request, Response } from "express";
import { ResponseService } from "./response.service.js";
import { BoardSize } from "@repo/types/board";

export class GameService {
  // one to one mapping (username -> game)
  private games: Map<string, GameState> = new Map();

  private set = (username: string) => {
    const game = {
      correct: 0,
      total: 0,
    };

    this.games.set(username, game);

    return game;
  }
  
  private get = (username: string) => 
    this.games.get(username);

  private delete = (username: string) => 
    this.games.delete(username);

  private save = (username: string, game: GameState) => {
    try {
      // await prisma.games.create()
    } catch (error) {
      
    }
  }

  start = (req: Request, res: Response) => {
    const username = (req as any).user;
    const size = Number(req.query.size) as BoardSize;
    const mode = req.query.mode as GameMode;
    const timer = req.query.timer as Timer;

    if(!size || !mode || !timer) {
      return ResponseService.error(res, 500, "Missing some game state");
    }

    let game = this.get(username);

    if(!game) {
      game = this.set(username);
    }

    game.status = GameStatus.START;
    game.size = size;
    game.mode = mode;
    game.startedAt = Date.now();
    game.timer = timer;

    return ResponseService.success(res, 200, { 
      game
    }, "Game initiated"); 
  }

  sendSquare = (req: Request, res: Response) => {
    const username = (req as any).user;

    const game = this.get(username);
    const size = game?.size;

    if(!game || !size) {
      return ResponseService.error(res, 500, "No game state found");
    }

    if (game.status !== GameStatus.START) {
      return ResponseService.error(res, 409, "Game not active");
    }    

    // if(game.currentTarget) {
    //   return ResponseService.error(res, 409, "A square is already awaiting verification");
    // }

    const now = Date.now();
 
    if(now >= game.startedAt! + Number(game.timer) * 1000) {
      // save game state in db
      // await this.save(username, game);

      return ResponseService.error(res, 403, "Times up!");
    }

    const idx = Math.floor(Math.random() * size);

    const target = {
      file: ROWS[idx],
      rank: idx + 1
    } as SquareType;

    game.currentTarget = target;
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
      if(!currentTarget || !game.currentTarget) {
        return ResponseService.error(
          res, 
          400, 
          "Missing target or previous target not set"
        );
      }

      const { file, rank } = game.currentTarget;

      const isCorrect =
      currentTarget.file === file &&
      currentTarget.rank === rank;

      if (!isCorrect) {
        return ResponseService.error(res, 400, "Incorrect square");
      }

      game.correct++;
      game.currentTarget = undefined;
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

    const { correct, total } = game;

    this.delete(username);

    return ResponseService.success(res, 200, { 
      correct,
      total
    }, "");
  }

  cleanUp() {
    const now = Date.now();

    for(const [username, state] of this.games.entries()) {
      if(now - state.startedAt! > THIRTY_MINUTES) {
        this.delete(username);
      }
    }
  }
}

const MAX_ROW_LENGTH = 8;

const ROWS = Array.from(
  { length: MAX_ROW_LENGTH }, (_, r) => String.fromCharCode(r + 97)
);

const THIRTY_MINUTES = 30 * 60 * 1000;