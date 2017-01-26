require('./gulp/dev');
require('./gulp/styles');
require('./gulp/scripts');
require('./gulp/build');

const gulp = require('gulp');

gulp.task('default', () => {
  gulp.start('dev');
});
