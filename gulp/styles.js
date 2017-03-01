const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => (
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass({
      includePaths: ['node_modules/normalize-scss/sass'],
    })
    .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./app/temp'))
));
