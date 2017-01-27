const gulp = require('gulp');
const postcss = require('gulp-postcss');

gulp.task('styles', () =>
  gulp.src('./app/css/styles.css')
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-mixins'),
      require('postcss-simple-vars'),
      require('postcss-nested'),
      require('postcss-hexrgba'),
      require('autoprefixer')
    ]))
    .on('error', err => {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/dev/'))
);
