gulp  = require 'gulp'
del   = require 'del'
$     = require('gulp-load-plugins')()

paths = gulp.paths

gulp.task 'js', ->
  del [paths.dist + '/js/*']

  gulp.src paths.src + '/**/*.coffee'
  .pipe $.plumber()
  .pipe $.concat('busca-cep.js')
  .pipe $.coffee(bare: no)
  .pipe gulp.dest(paths.dist + '/js')

  gulp.src paths.src + '/**/*.coffee'
  .pipe $.plumber()
  .pipe $.concat('busca-cep.min.js')
  .pipe $.uglify()
  .pipe gulp.dest(paths.dist + '/js')
