var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require("gulp-livereload");
var connect = require('gulp-connect');

gulp.task('compile-sass', function() {
    gulp.src('./assets/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'))
        .pipe(livereload());
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch-html', function() {
  gulp.src('index.html')
  .pipe(livereload());
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['./assets/styles/*.scss'], ['compile-sass']);
  gulp.watch(['./index.html'], ['watch-html']);
})

gulp.task('default', ['webserver','watch']);