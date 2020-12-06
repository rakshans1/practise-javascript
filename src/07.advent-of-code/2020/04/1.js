const fs = require('fs');

const inp = fs.readFileSync(`${__dirname}/input`, 'utf-8');
const input = inp.split('\n\n').map((i) => i.replace(/\n/g, ' ').split(' ').filter(Boolean)).filter((i) => i.length).map((i) => i.reduce((obj, j) => {
  const [key, value] = j.split(':');
  obj[key] = value;
  return obj;
}, {}));

const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let count = 0;

input.forEach((i) => {
  let invalid = false;
  fields.forEach((f) => {
    if (!i[f]) {
      invalid = true;
    }
  });
  if (invalid) {
    console.log(i);
    count++;
  }
});

console.log(input.length - count);
