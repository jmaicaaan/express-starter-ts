const gulp = require('gulp');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');
const gulpInsert = require('gulp-insert');
const path = require('path');
const yargs = require('yargs');

const ormTestConfig = require('./config/ormconfig.test.json');

const generatorPaths = {
  entities: __dirname + '/generators/entities/*.**',
  repositories: __dirname + '/generators/repositories/*.**',
  scripts: __dirname + '/generators/scripts/*.**'
};
const mainFolder = {
  entities:  __dirname + '/src/database/entities',
  repositories: __dirname + '/src/database/repositories',
  scripts: __dirname + '/src/scripts'
};

function capName(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function fileCreator(destination, filename, generatorPath, gulpTemplateData) {
  console.log(gulpTemplateData);
  return gulp.src(generatorPath)
    .pipe(gulpTemplate(gulpTemplateData))
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace('temp', filename);
    }))
    .pipe(gulp.dest(destination));
}

gulp.task('create-file-entity', [], () => {
  const name = yargs.argv.name;
  fileCreator(mainFolder.entities, name, generatorPaths.entities, {
    name: name,
    upCaseName: capName(name)
  })
});

gulp.task('create-file-repository', [], () => {
  const name = yargs.argv.name;
  fileCreator(mainFolder.repositories, name, generatorPaths.repositories, {
    name: name,
    upCaseName: capName(name)
  })
});

gulp.task('add-entity', ['create-file-entity'], () => {
  const name = yargs.argv.name;
  const line = `\nexport { ${capName(name)} } from './${name}.entity';`
  const rootFile = path.join(mainFolder.entities, 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(mainFolder.entities));
});

gulp.task('add-repository', ['create-file-repository'], () => {
  const name = yargs.argv.name;
  const line = `\nexport { ${capName(name)} } from './${name}.repository';`
  const rootFile = path.join(mainFolder.repositories, 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(mainFolder.repositories));
});

function createTravisConfig(lifecycle) {
  if (lifecycle) {
    switch (lifecycle) {
      case 'BEFORE_SCRIPT':
        const name = 'before.travis';
        fileCreator(mainFolder.scripts, name, generatorPaths.scripts, {
          databaseName: ormTestConfig.database,
          username: ormTestConfig.username,
          password: ormTestConfig.password
        }, true);
        break;
      default:
        throw 'No travis lifecycle defined. See https://docs.travis-ci.com/user/customizing-the-build/ for more.'
    }
  } else {
    throw 'No travis lifecycle defined. See https://docs.travis-ci.com/user/customizing-the-build/ for more.'
  }
}

gulp.task('setup-config', [], () => {
  createTravisConfig('BEFORE_SCRIPT');
});
