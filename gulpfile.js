//FIRST INSTALL NODE.JS
//INSTALL GULP
// sudo npm install --global gulp
// sudo npm install --save-dev gulp

//INSTALL SASS PROCESSOR
// sudo npm install --save-dev gulp-sass

//INSTALL JSHINT FOR JAVASCRIPT VALIDATION
// sudo npm install --save-dev gulp-jshint

//INSTALL LiveReload plugin
//***requires chrome live reload extension to be installed as well (https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
//sudo npm install --save-dev gulp-livereload



var gulp = require('gulp');
var sass = require('gulp-sass')
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var sassdoc = require('sassdoc');

var paths = {
  sass: ['./css/scss/*.scss'],
  lint: ['./javascript/*.js'],
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 20%', 'Firefox ESR', 'ie 8-11']
};


gulp.task('sass', function () {
    gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./css'));
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sassdoc', function () {
  return gulp
    .src(paths.sass)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
//  gulp.watch(paths.lint, ['lint']);
  livereload.listen();
  gulp.watch('./css/*.css').on('change', livereload.changed);
  gulp.watch(paths.lint).on('change', livereload.changed);
});

gulp.task('default', ['watch', 'sass']);
//gulp.task('default', ['watch', 'sass', 'lint']);