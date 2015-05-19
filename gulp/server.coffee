gulp = require 'gulp'
$    = require('gulp-load-plugins')()

gulp.task 'server', ->
  $.connect.server(root: '.')
