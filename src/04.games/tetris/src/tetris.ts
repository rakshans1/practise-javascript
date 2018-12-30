import { IOffset, IPlayer } from './types';
import { createPiece, createMatrix, collide, rotate } from './utils';
import { colors, arena, player } from './config';

const arenaSweep = () => {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;
    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

const playerReset = () => {
  const pieces = 'ILJOSTZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0)

  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

const drawMatrix = (context: CanvasRenderingContext2D, matrix: number[][], offset: IOffset): void => {
  matrix.forEach((row, y: number) => {
    row.forEach((value, x: number) => {
      if (!value) return;
      context.fillStyle = colors[value];
      context.fillRect(x + offset.x, y + offset.y, 1, 1);
    })
  })
}

const merge = (arena: number[][], player: IPlayer): void => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) return;
      arena[y + player.pos.y][x + player.pos.x] = value;
    })
  })
};

const draw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(context, arena, { x: 0, y: 0 });
  drawMatrix(context, player.matrix, player.pos);
}

let lastTime: number = 0;
let dropCounter: number = 0;
let dropInterval: number = 1000;

const update = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => (time: number = 0) => {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw(context, canvas);
  requestAnimationFrame(update(context, canvas))
}

const playerDrop = () => {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

const playerMove = (dir: number) => {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

const playerRotate = (dir: number) => {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir)
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

const updateScore = () => {
  const scoreBoard = document.getElementById('score');
  if (scoreBoard) {
    scoreBoard.innerText = `Score: ${player.score}`;
  }
}

const keyboardListen = () => {
  document.addEventListener('keydown', (event) => {
    const { keyCode } = event;
    if (keyCode === 37) {
      playerMove(-1);
    } else if (keyCode === 39) {
      playerMove(1);
    } else if (keyCode === 40) {
      playerDrop();
    } else if (keyCode === 81) {
      playerRotate(-1);
    } else if (keyCode === 87) {
      playerRotate(1);
    }
  })
}

const init = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('tetris');
  const context = canvas.getContext('2d');
  if (context) {
    context.scale(20, 20);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    playerReset();
    updateScore();
    update(context, canvas)();
    keyboardListen();
  }
}

init();
