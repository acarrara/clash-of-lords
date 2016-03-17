module.exports = {

    app: {
        all: './app/**/*',

        scripts: './app/scripts/**/*.ts',
        test: './app/test/**/*.ts',

        sass: './app/sass/style.scss',
        icons: './app/sass/icons/**/*',

        typings: './typings/**/*.d.ts'
    },
    dist: {
        all: './dist',

        scriptsJs: './dist/scripts/**/*.js',
        testJs: './dist/test/**/*.js',

        scripts: './dist/scripts',
        test: './dist',
        libs: './dist/libs',

        css: './dist/css',
        icons: './dist/css/icons'
    },

    tsconfig: './tsconfig.json',

    userconfig: '../userconfig',

    libs: {
        systemjs: 'node_modules/systemjs/dist/system.src.js',
        systemPolyfills: 'node_modules/systemjs/dist/system-polyfills.js',
        angular: 'node_modules/angular/angular.min.js',
        angular2: 'node_modules/angular2/bundles/angular2.dev.js',
        angular2Polyfills: 'node_modules/angular2/bundles/angular2-polyfills.min.js',
        reactiveJS: 'node_modules/rxjs/bundles/Rx.js',
        es6Shim: 'node_modules/es6-shim/es6-shim.min.js',
        shimsForIE: 'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js'
    },
    devLibs: {
        angularMocks: 'node_modules/angular-mocks/angular-mocks.js',
        systemjs: 'node_modules/systemjs/dist/system.js',
        es6ModuleLoader: 'node_modules/es6-module-loader/dist/es6-module-loader.js',
        phantomjsPolyfill: 'node_modules/phantomjs-polyfill/bind-polyfill.js'
    }

};