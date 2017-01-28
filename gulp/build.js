const gulp = require('gulp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

gulp.task('deleteDocsFolder', () =>
  del('./docs/')
);

gulp.task('copyGeneralFiles', ['deleteDocsFolder'], () =>
  gulp.src([
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/',
    '!./app/assets/**/*',
    '!./app/css/',
    '!./app/css/**/*',
    '!./app/js/',
    '!./app/js/**/*',
    '!./app/temp/',
    '!./app/temp/**/*'
  ])
  .pipe(gulp.dest('./docs/'))
);

gulp.task('optimizeImages', ['deleteDocsFolder'], () =>
  gulp.src(['./app/assets/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'))
);

gulp.task('useminTrigger', ['deleteDocsFolder'], () => {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () =>
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [() => rev(), () => cssnano()],
      js: [() => rev(), () => uglify()]
    }))
    .pipe(gulp.dest('./docs/'))
);

gulp.task('build', ['deleteDocsFolder', 'optimizeImages', 'useminTrigger', 'copyGeneralFiles']);
