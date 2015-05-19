gulp = require 'gulp'
require('require-dir')('./gulp')

gulp.pths = 
  dist: 'dist'
  src: 'src'

gulp.task 'src', ['js']

gulp.task 'watch', ->
  gulp.watch 'src/**/*', ['src']

gulp.task 'default', ['src']
