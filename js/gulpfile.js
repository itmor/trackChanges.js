const gulp = require('gulp'),
      terser = require('gulp-terser'),
      rename = require('gulp-rename');

gulp.task('compress', (done) => {
  gulp.src('resources/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(terser())
    .pipe(gulp.dest('build/'));
    done();
});

// Watch task
gulp.task('watch', () => {
  gulp.watch('resources/*.js', gulp.series('compress'));
});

// Default task
gulp.task('default', gulp.series(['watch', 'compress'], (done) => {
  done();
}));