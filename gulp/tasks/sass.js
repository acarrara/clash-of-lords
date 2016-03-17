var gulp = require('gulp');
var sass = require('gulp-sass');

var config = require('../config');

var app = config.app;
var dist = config.dist;

gulp.task('_compileSass', ['_copyIcons'], function () {
    gulp.src(app.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist.css));
});

gulp.task('_copyIcons', function () {
    gulp.src([app.icons])
        .pipe(gulp.dest(dist.icons));
});