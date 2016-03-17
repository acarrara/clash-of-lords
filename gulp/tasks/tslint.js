var gulp = require('gulp');
var gtslint = require('gulp-tslint');
var tslint = require('tslint');

var config = require('../config');
var rules = require('../tslint');

var src = config.app.scripts;
var test = config.app.test;

gulp.task('tslint', function () {
    return gulp.src([src, test])
        .pipe(gtslint({
            configuration: rules,
            tslint: tslint
        }))
        .pipe(gtslint.report('verbose'));
});
