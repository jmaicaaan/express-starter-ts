import { readdirSync, readFileSync } from 'fs';
import { Container } from 'typedi';

import { sync } from 'glob';

import { Database } from '../utils';

// Temporary Seed Executor

const seedExecutor = async () => {

  if (process.env.NODE_ENV !== 'test') {
    console.log('The seed is currently supported for test environment only');

    process.exit(0);
    return;
  }

  try {
    const database = Container.get(Database);
    await database.connect();

    const files = sync(__dirname + '/*.sql');

    for (const file in files) {
      if (file) {
        const filePath = files[file];

        logger(filePath, 'FILE');

        const sql = readFileSync(filePath, { encoding: 'utf-8' });
        const data = await database.executeSQL(sql);

        logger(data, 'DATA');
      }
    }
  } catch (error) {
    logger(error, 'ERROR');
    throw error;
  } finally {
    process.exit(0);
  }
};

/**
 * Helper function to log things up
 */

function logger(data, type) {

  switch (type) {
    case 'FILE':
      console.log(`${ data } is will be executed next..`);
      break;
    case 'DATA':
      console.log('data', data);
      break;
    case 'ERROR':
      console.error('err', data);
      break;
    default:
      console.log('No data to be log');
  }
}

seedExecutor();
