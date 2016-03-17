var gulp = require('gulp');
var Server = require('karma').Server;

var config = require('../config');

gulp.task('test', function () {
    new Server({
        configFile: process.cwd() + '/karma.conf.js'
    }).start();
});