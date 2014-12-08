var gulp     = require('gulp'),
    nodeunit = require('gulp-nodeunit'),
    istanbul = require('gulp-istanbul');


gulp.task('test', function() {
  return gulp.src(['src/*.js', 'lambda.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function(){
      gulp.src('./test/*.js')
        .pipe(nodeunit({
          reporter: 'junit',
          reporterOptions: {
            output: 'test'
          }
        }))
        .pipe(istanbul.writeReports());
    });
});


gulp.task('default', ['test']);