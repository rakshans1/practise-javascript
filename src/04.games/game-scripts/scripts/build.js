process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});
const webpack = require('webpack');

const config = require('../webpack.config')();

const compiler = webpack(config);
console.log('Creating an optimized production build...');


compiler.run((err) => {
  if (err) {
    console.log(err);
  }
});
