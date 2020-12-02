const fs = require('fs');

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const readFileSync = path => tryCatch(() => fs.readFileSync(path));

const parseJson = contents => tryCatch(() => JSON.parse(contents));

const getPort = () => readFileSync(`${__dirname}/config.json`)
  .chain(parseJson)
  .map(config => config.port)
  .fold(() => 8000, x => x);

const res = getPort();

console.log(res);
