const gulp = require('gulp');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');
const gulpInsert = require('gulp-insert');
const path = require('path');
const yargs = require('yargs');

const root = 'src';
const generatorPaths = {
  controller: path.join(__dirname, 'generators', 'controllers/*.**'),
  entities: path.join(__dirname, 'generators', 'entities/*.**')
};
const mainFolder = {
  controller: 'controllers',
  entities: 'entities'
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

gulp.task('create-file-controller', [], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.controller), name);

  return gulp.src(generatorPaths.controller)
    .pipe(gulpTemplate({
      name: name,
      upCaseName: capName(name)
    }))
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destinationPath));
});

gulp.task('add-controller', ['create-file-controller'], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.controller));
  const line = `\nexport { ${capName(name)} } from './${name}/${name}.controller';`
  const rootFile = path.join(pathResolver(mainFolder.controller), 'index.ts');

  return gulp.src(rootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(destinationPath));
});

gulp.task('create-file-entity', [], () => {
  const name = yargs.argv.name;
  const destinationPath = path.join(pathResolver(mainFolder.entities));

  return gulp.src(generatorPaths.entities)
    .pipe(gulpTemplate({
      name: name,
      upCaseName: capName(name)
    }))
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
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
