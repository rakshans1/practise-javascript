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
    count++;
    return;
  }

  Object.entries(i).forEach(([k, v]) => {
    if (invalid) return;

    switch (k) {
      case 'byr': {
        const value = Number(v);
        if (value < 1920 || value > 2002) {
          invalid = true;
        }
        break;
      }
      case 'iyr': {
        const value = Number(v);
        if (value < 2010 || value > 2020) {
          invalid = true;
        }
        break;
      }
      case 'eyr': {
        const value = Number(v);
        if (value < 2020 || value > 2030) {
          invalid = true;
        }
        break;
      }
      case 'hgt': {
        if (v.includes('cm')) {
          const value = Number(v.slice(0, -2));
          if (value < 150 || value > 193) {
            invalid = true;
          }
        }
        if (v.includes('in')) {
          const value = Number(v.slice(0, -2));
          if (value < 59 || value > 76) {
            invalid = true;
          }
        }
        break;
      }
      case 'hcl': {
        if (v.length !== 7) {
          invalid = true;
          return;
        }
        if (!/#[0-9a-f]{6}/.test(v)) {
          invalid = true;
        }
        break;
      }
      case 'ecl': {
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v)) {
          invalid = true;
        }
        break;
      }
      case 'pid': {
        if (v.length !== 9) {
          invalid = true;
          return;
        }
        if (!/\d{9}/.test(v)) {
          invalid = true;
        }
        break;
      }
      default:
        break;
    }
  });
  if (invalid) {
    count++;
  }
});

console.log(input.length - count);
