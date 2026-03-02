const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compile SCSS to css/resume.css
function compileSass() {
  return src('scss/resume.scss')
    .pipe(sass({ silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'] }).on('error', sass.logError))
    .pipe(header(banner, { pkg }))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Minify css/resume.css → css/resume.min.css
function minifyCss() {
  return src('css/resume.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

// Minify custom JS
function minifyJs() {
  return src('js/resume.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('js'))
    .pipe(browserSync.stream());
}

// Copy vendor files from /node_modules into /vendor
function copy() {
  const bootstrap = src([
    'node_modules/bootstrap/dist/**/*',
    '!**/npm.js',
    '!**/bootstrap-theme.*',
    '!**/*.map'
  ]).pipe(dest('vendor/bootstrap'));

  return bootstrap;
}

// Configure the browserSync task
function serve(done) {
  browserSync.init({
    server: { baseDir: '' }
  });
  done();
}

// Dev task — watch with live reload
function devWatch() {
  watch('scss/*.scss', series(compileSass, minifyCss));
  watch('js/resume.js', minifyJs);
  watch('*.html').on('change', browserSync.reload);
}

// Export tasks
exports.sass = compileSass;
exports['minify-css'] = series(compileSass, minifyCss);
exports['minify-js'] = minifyJs;
exports.copy = copy;
exports.dev = series(parallel(serve, series(compileSass, minifyCss), minifyJs), devWatch);
exports.default = parallel(series(compileSass, minifyCss), minifyJs, copy);
