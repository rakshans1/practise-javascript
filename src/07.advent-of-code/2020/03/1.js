const fs = require('fs');

const inp = fs.readFileSync(`${__dirname}/input`, 'utf-8');
const input = inp.split('\n').map((i) => i.split('')).filter((i) => i.length);

let tree = 0;

for (let i = 0; i < input.length; i++) {
  const j = i * 3;
  const row = input[i];
  const index = j % row.length;
  if (row[index] === '#') {
    tree++;
  }
  console.log(i, [...row.slice(0, index), '\x1b[31m', row[index], '\x1b[0m', ...row.slice(index + 1, row.length)].join(''));
}
console.log(tree);
