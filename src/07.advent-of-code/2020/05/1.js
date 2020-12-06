const fs = require('fs');

const inp = fs.readFileSync(`${__dirname}/input`, 'utf-8');
const input = inp.split('\n').map((i) => i.split('')).filter((i) => i.length);

const ids = [];

input.forEach((i) => {
  const rows = i.slice(0, -3);
  const colums = i.slice(-3, i.length);

  let rowseats = [0, 127];
  let columnseats = [0, 7];

  const getseat = (seat, position) => {
    const [first, last] = seat;
    let newFirst = null;
    let newLast = null;

    const middle = (first + last) / 2;
    if (position === 'B' || position === 'R') {
      newFirst = Math.ceil(middle);
      newLast = last;
    }
    if (position === 'F' || position === 'L') {
      newFirst = first;
      newLast = Math.floor(middle);
    }
    return [newFirst, newLast];
  };

  rows.forEach((p) => {
    rowseats = getseat(rowseats, p);
  });

  colums.forEach((p) => {
    columnseats = getseat(columnseats, p);
  });

  ids.push(rowseats[0] * 8 + columnseats[0]);
});

let largest = 0;

ids.forEach((id) => {
  if (id > largest) {
    largest = id;
  }
});
console.log(largest);
