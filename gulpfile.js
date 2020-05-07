const gulp = require('gulp'),
      terser = require('gulp-terser'),
      rename = require('gulp-rename');
// JS task
gulp.task('compress', (done) => {
  gulp.src('src/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(terser())
    .pipe(gulp.dest('build/'));
    done();
});

// Watch task
gulp.task('watch', () => {
  gulp.watch('src/*.js', gulp.series('compress'));
});

// Default task
gulp.task('default', gulp.series(['watch', 'compress'], (done) => {
  done();
}));