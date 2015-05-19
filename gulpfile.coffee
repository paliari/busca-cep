gulp = require 'gulp'

gulp.paths = 
  dist: 'dist'
  src: 'src'

require('require-dir')('./gulp')

gulp.task 'src', ['js']

gulp.task 'watch', ->
  gulp.watch 'src/**/*', ['src']

gulp.task 'default', ['src']
