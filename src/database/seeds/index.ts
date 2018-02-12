import { Container } from 'typedi';

import { readdirSync } from 'fs';
import { join } from 'path';
import { SeedInterface } from '../../libs/seed.interface';
import { Database } from '../database';

/**
 * This file is responsible for opening and closing of database connection. (Isolated)
 * Also, this file is the one who will run all the seeds (*.seed.ts)
 *
 */

const index = async () => {
  const db = Container.get(Database);
  const connection = await db.connect();

  try {
    const files = readdirSync(__dirname);
    for (const i in files) {
      if (files[i]) {
        try {
          const file = files[i];
          if (file.indexOf('.seed') > -1) {
            const fileClazz = require('./' + file);
            const clazzKeyName = Object.keys(fileClazz).length ? Object.keys(fileClazz)[0] : '';
            const clazzInstance: SeedInterface = new fileClazz[clazzKeyName]();
            await clazzInstance.seed(connection);
            console.log(`Finish running seed ${file}`);
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }
  } catch (error) {
    throw error;
  } finally {
    console.log('Finish running all seeds');
    connection.close();
    process.exit(0);
  }
};

index();
