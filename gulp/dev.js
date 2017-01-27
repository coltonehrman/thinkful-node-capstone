const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('dev', ['styles', 'scripts'], () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app'
    }
  });

  watch('./app/index.html', () => {
    browserSync.reload();
  });

  watch('./app/css/**/*.css', () => {
    gulp.start('injectCss');
  });

  watch('./app/js/**/*.js', () => {
    gulp.start('refreshJs');
  });
});

gulp.task('injectCss', ['styles'], () =>
  gulp.src('./app/dev/styles.css')
    .pipe(browserSync.stream())
);

gulp.task('refreshJs', ['scripts'], () => {
  browserSync.reload();
});
