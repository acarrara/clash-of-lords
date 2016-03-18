var conf = require('./gulp/config.js');

var scriptsJs = conf.dist.scriptsJs;
var testJs = conf.dist.testJs;
var libs = conf.libs;
var devLibs = conf.devLibs;
var testLibs = conf.testLibs;

module.exports = function (config) {
    config.set({

        basePath: '',

        files: [
            scriptsJs,
            testJs
        ],

        systemjs: {
            includeFiles: [
                libs.systemjs,
                libs.angular2Polyfills,
                libs.reactiveJS,
                libs.angular2,
                testLibs.angular2testing
            ],
            serveFiles: [
                scriptsJs,
                testJs
            ],
            config: {
                baseURL: '',
                transpiler: null,
                defaultJSExtensions: true,
                paths: {
                    'angular2': devLibs.angular2,
                    'angular2testing': testLibs.angular2testing,
                    'es6-module-loader': devLibs.es6ModuleLoader,
                    'systemjs': devLibs.systemjs,
                    'system-polyfills': libs.systemPolyfills,
                    'phantomjs-polyfill': devLibs.phantomjsPolyfill
                }
            }
        },

        frameworks: ['systemjs', 'jasmine'],

        reporters: ['dots'],

        port: 9879,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });
};