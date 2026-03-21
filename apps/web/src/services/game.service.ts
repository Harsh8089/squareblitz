import { GameData, Response } from "@repo/types/response"
import { api } from "./axios.service";
import { GameSettings } from "@repo/types/game";
import { Square } from "@repo/types/square";

type GameResponse = Promise<Response<GameData>>;

export const gameService = {
  start: async({ size, mode, timer }: Required<GameSettings>): GameResponse => {
    return (await api.get(
      "/game/start",
      {
        params: {
          size,
          mode,
          timer
        }
      }
    ))
    .data;
  },
  send: async(): GameResponse => {
    return (await api.get(
      "/game/send",
    ))
    .data;
  },
  verify: async(target: Square): GameResponse => {
    return (await api.post(
      "/game/verify",
      {
        target
      }
    ))
    .data;
  },
  end: async(): GameResponse => {
    return (await api.post(
      "/game/end",
      {}
    ))
    .data;
  }
}