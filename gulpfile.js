const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');

// JS task
gulp.task('js-es6', (done) => {
  gulp.src('src/*.js')
    .pipe(plumber())
	  .pipe(jshint())
    .pipe(babel())
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build'));
  done();
});

// Clean tasks
gulp.task('clean', () => {
  return del([
    'build'
  ]);
})

// Watch task
gulp.task('watch', () => {
  // JS
  gulp.watch('src/*.js', gulp.series('js-es6'));
});

// Default task
gulp.task('default', gulp.series(['clean', 'js-es6', 'watch'], (done) => {
  done();
}));