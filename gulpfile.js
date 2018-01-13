const gulp = require('gulp');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');
const gulpInsert = require('gulp-insert');
const path = require('path');
const yargs = require('yargs');

const ormTestConfig = require('./config/ormconfig.test.json');

const root = 'src';
const generatorPaths = {
  controllers: path.join(__dirname, 'generators', 'controllers/*.**'),
  entities: path.join(__dirname, 'generators', 'entities/*.**'),
  middlewares: path.join(__dirname, 'generators', 'middlewares/*.**'),
  scripts: path.join(__dirname, 'generators', 'scripts/*.**')
};
const mainFolder = {
  controllers: 'controllers',
  entities: 'entities',
  middlewares: 'middlewares',
  scripts: 'scripts'
};

function pathResolver(mainFolder) {
  if (mainFolder) {
    return path.join(root, mainFolder);
  }
  throw 'No main folder specified';
}

function capName(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function fileCreator(destination, filename, generatorPath, gulpTemplateData, createFolder) {
  const destinationPath = path.join(pathResolver(destination), createFolder ? '' : filename);
  return gulp.src(generatorPath)
    .pipe(gulpTemplate(gulpTemplateData))
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace('temp', filename);
    }))
    .pipe(gulp.dest(destinationPath));
}

gulp.task('create-file-controller', [], () => {
  const name = yargs.argv.name;
  fileCreator(mainFolder.controllers, name, generatorPaths.controllers, {
    name: name,
    upCaseName: capName(name)
  });
});

gulp.task('create-file-middleware', [], () => {
  const name = yargs.argv.name;
  fileCreator(mainFolder.middlewares, name, generatorPaths.middlewares, {
    name: name,
    upCaseName: capName(name)
  }, true)
});

gulp.task('create-file-entity', [], () => {
  const name = yargs.argv.name;
  fileCreator(mainFolder.entities, name, generatorPaths.entities, {
    name: name,
    upCaseName: capName(name)
  }, true)
});

gulp.task('add-controller', ['create-file-controller'], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.controllers));
  const line = `\nexport { ${capName(name)} } from './${name}/${name}.controller';`
  const rootFile = path.join(pathResolver(mainFolder.controllers), 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(destinationPath));
});

gulp.task('add-middleware', ['create-file-middleware'], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.middlewares));
  const line = `\nexport { ${capName(name)} } from './${name}.middleware';`
  const rootFile = path.join(pathResolver(mainFolder.middlewares), 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(destinationPath));
});

gulp.task('add-entity', ['create-file-entity'], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.entities));
  const line = `\nexport { ${capName(name)} } from './${name}.entity';`
  const rootFile = path.join(pathResolver(mainFolder.entities), 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(destinationPath));
});

gulp.task('createTravisBeforeScript', [], () => {
  const name = 'before.travis';

  fileCreator(mainFolder.scripts, name, generatorPaths.scripts, {
    databaseName: ormTestConfig.database,
    username: ormTestConfig.username,
    password: ormTestConfig.password
  }, true);
});