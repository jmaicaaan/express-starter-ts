'use strict';

const typeorm = require('typeorm');
const path = require('path');
const fs = require('fs');

const rootFile = path.join(process.cwd(), 'dist/database/seeds');
let ormConfig;

/**
 * This file is responsible for opening and closing of database connection. (Isolated)
 * Also, this file is the one who will run all the seeds (*.seed.js)
 */

async function SeedExecutor() {
  let connection;

  if (!ormConfig) {
    try {
      ormConfig = require(path.join(process.cwd(), 'ormconfig'));
    } catch (error) {
      throw `Cannot find ormconfig.js in ${process.cwd()}`
    }
  }

  try {
    connection = await getDatabaseConnection().connect();
    let files = fs.readdirSync(rootFile);
    files = files.filter((i) => i.indexOf('.seed') > -1);

    for (const i in files) {
      if (files[i]) {
        try {
          const file = files[i];
          const seedFile = require(path.join(rootFile, file));
          
          // always getting the first index, as it implies a single class
          const classKey = Object.keys(seedFile)[0];
          const seedClassInstance = seedFile[classKey].prototype;
          await seedClassInstance.seed(connection);
          console.log(`Finish running seed ${file}`);
        } catch (error) {
          console.log('error', error);
          throw error;
        }
      }
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.close();
    }
    console.log('Finish running all seeds');
    process.exit(0);
  }
  
}

function getDatabaseConnection() {
  try {
    ormConfig.name = 'seed-connection'; // to avoid using the 'default' connection
    const connectionManager = typeorm.getConnectionManager();
    return connectionManager.has(ormConfig.name) ? connectionManager.get(ormConfig.name) : connectionManager.create(ormConfig);
  } catch (error) {
    console.log('Cannot find ormconfig.js');
    throw error;
  }
}

SeedExecutor();