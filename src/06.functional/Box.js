const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`,
});

const first = xs => xs[0];

const halfTheFisrtLargeNumber = xs => Box(xs)
  .map(i => i.filter(x => x >= 20))
  .map(found => first(found) / 2)
  .fold(answer => `The answer is ${answer}`);


const res = halfTheFisrtLargeNumber([1, 4, 50]);
console.log('hi', res);
