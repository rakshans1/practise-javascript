const chalk = require('chalk');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');


const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const config = require('../webpack.config')();

const compiler = webpack(config);


const devServer = new WebpackDevServer(compiler);


devServer.listen(DEFAULT_PORT, HOST, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(chalk.cyan('Starting the development server...\n'));
});


['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    devServer.close();
    process.exit();
  });
});
