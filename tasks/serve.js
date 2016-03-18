var gulp = require('gulp');
var liveServer = require('live-server');
var express = require('express');
var config = require('../gulp.config')();
/* Start live server dev mode */
gulp.task('serve-dev', ['wiredep', 'tsc-app', 'watch-ts', 'watch-sass'], function () {
    liveServer.start(config.liveServer.dev);
});

gulp.task('serve-heroku', ['tsc-app', 'sass'], function () {
    var port = Number(process.env.PORT || 5000);
    var app = express();

    app.use(express.static(__dirname));
    var server = app.listen(port, function () {
        console.log('Listening on port %d', server.address().port);
    });
});

/* Start live server production mode */
gulp.task('serve-build', ['build'], function () {
    liveServer.start(config.liveServer.prod);
});