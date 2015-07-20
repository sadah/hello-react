var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var uglify     = require('gulp-uglify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var webserver  = require('gulp-webserver');

gulp.task('browserify', function() {
  browserify('./src/app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
  gulp.watch('./src/*.jsx', ['browserify'])
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 3000,
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
