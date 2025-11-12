var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

// Compiles SCSS files from /scss into /css
function sassTask() {
  return gulp.src('scss/resume.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

// Minify compiled CSS
function minifyCss() {
  return gulp.src('css/resume.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

// Minify custom JS
function minifyJs() {
  return gulp.src('js/resume.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
function copy() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'));

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'));

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'));

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'));

  gulp.src([
      'node_modules/devicons/**/*',
      '!node_modules/devicons/*.json',
      '!node_modules/devicons/*.md',
      '!node_modules/devicons/!PNG',
      '!node_modules/devicons/!PNG/**/*',
      '!node_modules/devicons/!SVG',
      '!node_modules/devicons/!SVG/**/*'
    ])
    .pipe(gulp.dest('vendor/devicons'));

  return gulp.src(['node_modules/simple-line-icons/**/*', '!node_modules/simple-line-icons/*.json', '!node_modules/simple-line-icons/*.md'])
    .pipe(gulp.dest('vendor/simple-line-icons'));
}

// Configure the browserSync task
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ''
    },
  });
  cb();
}

// Watch files
function watchFiles() {
  gulp.watch('scss/*.scss', sassTask);
  gulp.watch('css/*.css', minifyCss);
  gulp.watch('js/*.js', minifyJs);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
}

// Define complex tasks
const css = gulp.series(sassTask, minifyCss);
const build = gulp.parallel(css, minifyJs, copy);
const dev = gulp.series(build, browserSyncServe, watchFiles);

// Export tasks
exports.sass = sassTask;
exports.css = css;
exports.js = minifyJs;
exports.copy = copy;
exports.dev = dev;
exports.default = build;
