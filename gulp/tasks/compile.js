var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');

var appScripts = config.app.scripts;
var appTest = config.app.test;
var appTypings = config.app.typings;

var distScripts = config.dist.scripts;
var distTest = config.dist.test;

var tsconfig = config.tsconfig;

var tsAppProject = typescript.createProject(tsconfig);
gulp.task('_compile', [], function () {
    var tsResult = gulp
        .src([appScripts, appTypings])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsAppProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distScripts));
});

var tsTestProject = typescript.createProject(tsconfig);
gulp.task('_compileTests', [], function () {
    var tsResult = gulp
        .src([appTest, appTypings])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsTestProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distTest));
});
