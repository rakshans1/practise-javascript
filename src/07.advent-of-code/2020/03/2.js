const fs = require('fs');

const inp = fs.readFileSync(`${__dirname}/input`, 'utf-8');
const input = inp.split('\n').map((i) => i.split('')).filter((i) => i.length);

const steps = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const trees = (right, down) => {
  let tree = 0;
  for (let i = 0; i < input.length; i += down) {
    const j = ((i / down) * right);
    const row = input[i];
    const index = j % row.length;
    if (row[index] === '#') {
      tree++;
    }
  }
  return tree;
};

console.log(steps.map((s) => trees(s[0], s[1])).reduce((acc, i) => acc * i, 1));
