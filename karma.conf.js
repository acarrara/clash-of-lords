var conf = require('./gulp/config.js');

var scriptsJs = conf.dist.scriptsJs;
var testJs = conf.dist.testJs;
var libs = conf.libs;
var devLibs = conf.devLibs;

module.exports = function (config) {
    config.set({

        basePath: '',

        files: [
            scriptsJs,
            testJs
        ],

        systemjs: {
            includeFiles: [
                libs.angular,
                devLibs.angularMocks
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