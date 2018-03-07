let config;

try {
  const path = process.cwd() + `/config/ormconfig.${process.env.NODE_ENV}.json`;
  config = require(path);
} catch (error) {
  const path = process.cwd() + `/config/ormconfig.json`;
  config = require(path);
}

config.entities = [ process.cwd() +  '/dist/database/entities/index.js' ];
config.migrations = [ process.cwd() + '/dist/database/migrations/*.js' ];
config.cli = {
  migrationsDir: '/src/database/migrations/'
};

module.exports = config;
