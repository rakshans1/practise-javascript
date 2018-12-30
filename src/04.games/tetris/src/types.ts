export interface IPlayer {
  pos: IOffset,
  matrix: number[][],
  score: number
}

export interface IOffset {
  x: number,
  y: number
}
