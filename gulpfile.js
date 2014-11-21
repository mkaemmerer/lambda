var gulp     = require('gulp'),
    nodeunit = require('gulp-nodeunit');


gulp.task('test', function () {
  return gulp.src('./test/*.js')
    .pipe(nodeunit({
      reporter: 'junit',
      reporterOptions: {
        output: 'test'
      }
    }));
});


gulp.task('default', ['test']);