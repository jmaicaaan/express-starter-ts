
const env = process.env.NODE_ENV || 'development';
let config;
switch (env) {
  case 'development':
    config = require(__dirname + '/config/ormconfig.json');
    break;
  case 'test':
    config = require(__dirname + '/config/ormconfig.test.json');
    break;
  default:
    config = require(__dirname + '/config/ormconfig.json');
      break;
}
config.entities = [ __dirname + '/dist/entities/*.entity.js' ];
config.migrations = [ __dirname + '/dist/migrations/*.js' ]
config.cli = {
  migrationsDir: '/src/migrations/'
}
module.exports = config;
