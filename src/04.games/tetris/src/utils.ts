import { IPlayer } from "./types";

export const createPiece = (type: string): number[][] => {
  switch (type) {
    case "T":
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
      break;
    case "O":
      return [
        [2, 2],
        [2, 2]
      ];
      break;
    case "L":
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ];
      break;
    case "J":
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0]
      ];
      break;
    case "S":
      return [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
      ];
      break;
    case "Z":
      return [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0]
      ];
      break;
    default:
      return [
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0]
      ];
      break;
  }
}

export const createMatrix = (w: number, h: number): number[][] => {
  const matrix: number[][] = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

export const collide = (arena: number[][], player: IPlayer): Boolean => {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

export const rotate = (matrix: number[][], dir: number) => {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
          matrix[y][x],
          matrix[x][y],
        ];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}
