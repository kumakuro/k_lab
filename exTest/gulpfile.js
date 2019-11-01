const { src, dest, task, watch, series, parallel } = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

var reload = browserSync.reload;


exports.default = function() {
    return src('/javascripts/works/*.js')
      .pipe(dest('/output/'));
  }