import * as commander from 'commander';
import { exec } from 'shelljs';
import { Container } from 'typedi';

import { Database } from './database/database';
import { UserSeed } from './database/seeds/user.seed';

const db = Container.get(Database);

commander
  .version('0.0.1');

commander
  .command('db:reset')
  .description('reset database base on node env')
  .action(async () => {
    console.log('resetting database');
    try {
      await db.connect();
      await db.reset();
      await db.disconnect();
      console.log('done');
    } catch (error) {
      throw new Error('Cannot reset database, make sure you have correct ormconfig and connection');
    }
  });

commander
.command('db:seed')
.description('seed database base on node env')
.action(async () => {
  console.log('seeding database');
  try {
    await db.connect();
    await db.seed();
    await db.disconnect();
    console.log('done');
  } catch (error) {
    throw new Error('Cannot seed database, make sure you have correct ormconfig and connection');
  }
});

commander
  .command('migrations:up')
  .action(() => {
    exec(`typeorm migrations:run`, (code, stdout, stderr) => {
      if (stderr) {
        console.log('migration error:', stderr);
        return;
      }
      console.log('migration output:', stdout);
    });
  });

commander
  .command('migrations:down')
  .action(() => {
    exec(`typeorm migrations:revert`, (code, stdout, stderr) => {
      if (stderr) {
        console.log('migration error:', stderr);
        return;
      }
      console.log('migration output:', stdout);
    });
  });

commander
  .command('migrations:create <name>')
  .action((name) => {
    exec(`typeorm migrations:create -n ${name}`, (code, stdout, stderr) => {
      if (stderr) {
        console.log('migration error:', stderr);
        return;
      }
      console.log('migration output:', stdout);
    });
  });

commander
  .command('migrations:generate <name>')
  .action((name) => {
    exec(`typeorm migrations:generate -n ${name}`, (code, stdout, stderr) => {
      if (stderr) {
        console.log('migration error:', stderr);
        return;
      }
      console.log('migration output:', stdout);
    });
  });

commander
  .command('*')
  .action(async () => {
    console.log('No command has been catched please see -h');
  });

commander.parse(process.argv);
