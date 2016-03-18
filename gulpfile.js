// Make sure to read the caveat below.
var realFs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(realFs);
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

var config = require('./gulp.config')();

/* Default task */
gulp.task('default', ['serve-dev']);