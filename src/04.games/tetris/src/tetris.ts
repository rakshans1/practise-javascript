import { IOffset, IPlayer } from './types';

const canvas = <HTMLCanvasElement>document.getElementById('tetris');
const context = canvas.getContext('2d');
if (context) {

  context.scale(20, 20);
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  const collide = (arena: number[][], player: IPlayer): Boolean => {
    const [m, o] = [player.matrix, player.pos];
    if (player.pos.x < 0 || player.pos.x >= arena[0].length) return true;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[x][y] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  const createMatrix = (w: number, h: number): number[][] => {
    const matrix: number[][] = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  const drawMatrix = (matrix: number[][], offset: IOffset): void => {
    matrix.forEach((row, y: number) => {
      row.forEach((value, x: number) => {
        if (!value) return;
        context.fillStyle = 'red';
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

  const arena: number[][] = createMatrix(12, 20);
  const player: IPlayer = {
    pos: { x: 5, y: 0 },
    matrix: matrix
  };

  const draw = () => {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
  }

  let lastTime: number = 0;
  let dropCounter: number = 0;
  let dropInterval: number = 1000;

  const update = (time: number = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
    }
    draw();
    requestAnimationFrame(update)
  }


  const playerDrop = () => {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      player.pos.y = 0;
    }
    dropCounter = 0;
  }

  const playerMove = (dir: number) => {
    player.pos.x += dir;
    if (collide(arena, player)) {
      player.pos.x -= dir;
    }
  }


  update();

  document.addEventListener('keydown', (event) => {
    const { keyCode } = event;
    if (keyCode === 37) {
      playerMove(-1);
    } else if (keyCode === 39) {
      playerMove(1);
    } else if (keyCode === 40) {
      playerDrop();
    }
  })
}
