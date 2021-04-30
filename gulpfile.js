// const { task } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const htmlmin = require('gulp-htmlmin');

// Compile and minify css from scss. Create source map
function style() {
  return gulp
    .src(['./src/scss/**/*.scss', '!./dist'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}
exports.style = style;

// Javascript
function javascript() {
  return gulp
    .src(['./src/js/**/*.js', '!./dist'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}
exports.javascript = javascript;

// Images optimization
function minifyImage() {
  return gulp
    .src(['./src/img/**/*.+(png|jpg|gif|svg)', '!/dist'])
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('./dist/img/'));
}
exports.minifyImage = minifyImage;

//  HTML Minify
function minifyHTML() {
  return gulp
    .src(['./src/**/*.html', './index.html', '!/dist'])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest('./dist'));
}
exports.minifyHTML = minifyHTML;

// Watch task with BrowserSync
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('./src/scss/**/*.scss', style).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', javascript).on('change', browserSync.reload);
  gulp.watch('./**/*.html', minifyHTML).on('change', browserSync.reload);
  gulp
    .watch('./src/img/**/*.+(png|jpg|gif|svg)', minifyImage)
    .on('change', browserSync.reload);
});

// Clear cache

gulp.task('clear-cache', function (done) {
  return cache.clearAll(done);
});
