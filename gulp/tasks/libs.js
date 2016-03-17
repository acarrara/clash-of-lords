var gulp = require('gulp');

var config = require('../config');
var libs = config.libs;
var distLib = config.dist.libs;

gulp.task('_copyLibs', [], function () {
    var libsList = new Array;
    for (var lib in libs) {
        libsList.push(libs[lib]);
    }
    return gulp.src(libsList)
        .pipe(gulp.dest(distLib))
});