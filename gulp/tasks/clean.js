var gulp = require('gulp');
var del = require('del');

var config = require('../config');
var dist = config.dist.all;

gulp.task('clean', function () {
    return del(dist);
});
