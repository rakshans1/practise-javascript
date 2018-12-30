import { createMatrix } from "./utils";
import { IPlayer } from "./types";

export const colors = [
  "black",
  "yellow",
  "gray",
  "magenta",
  "blue",
  "green",
  "red",
  "cyan"
];

export const arena: number[][] = createMatrix(12, 20);

export const player: IPlayer = {
  pos: { x: 0, y: 0 },
  matrix: [],
  score: 0
};
