var gulp = require('gulp');
var liveServer = require('live-server');
var config = require('../gulp.config')();

/* Start live server dev mode */
gulp.task('serve-dev', ['wiredep', 'tsc-app', 'watch-ts', 'watch-sass'], function () {
    liveServer.start(config.liveServer.dev);
});

gulp.task('serve-heroku', ['tsc-app', 'sass'], function () {
});

/* Start live server production mode */
gulp.task('serve-build', ['build'], function () {
    liveServer.start(config.liveServer.prod);
});