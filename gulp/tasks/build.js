var gulp = require('gulp');

gulp.task('build', [
    '_compile',
    '_compileTests',
    '_compileSass',
    '_copyLibs'
]);