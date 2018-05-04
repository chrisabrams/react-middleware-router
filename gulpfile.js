const gulp = require('gulp')
const mocha = require('gulp-mocha')

function processMocha(patterns) {

  gulp
    .src(patterns, {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      console.log('on end')
 
      process.exit()
    })
    .on('error', function (e) {
      console.error(e)

      process.exit(1)
    })

}

gulp.task('mocha', function(done) {

  processMocha([
    './test/setup.js',
    './test/unit/*.js'
  ])

})
