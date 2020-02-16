'use strict';

const { series, parallel, src, dest, watch } = require( 'gulp' );
const pug = require( 'gulp-pug' );
const scss = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );
const csso = require( 'gulp-csso' );
const plumber = require( 'gulp-plumber' );
const notify = require( 'gulp-notify' );
const rename = require( 'gulp-rename' );
const webpackStream = require( 'webpack-stream' );
const del = require( 'del' );
const browserSync = require( 'browser-sync' ).create();

// Корневые папки
const root = {
    src: 'src/',
    build: 'build/'
};

// Папки сборки
const path = {
    build: {
        html: root.build,
        css: root.build + 'styles/',
        js: root.build + 'scripts/'
    }
};

// Очистка дериктории сборки
function clearBuildDir() {
    return del([
        'build/**',
        '!build',
        '!build/fonts',
        '!build/fonts/**',
        '!build/images',
        '!build/images/**'
    ]);
}
exports.clearBuildDir = clearBuildDir;

// Компиляция PUG
function compilePug() {
    return src( [
        `${ root.src }pages/**/*.pug`,
        `!${ root.src }pages/**/*.data.pug`
    ] )
        .pipe( plumber( {
            errorHandler: notify.onError( {
                title: "Ошибка PUG",
                message: "Error: <%= error.message %>"
            } )
        } ) )
        .pipe( pug({
            pretty: true
        } ) )
        .pipe( rename({
            dirname: ''
        } ) )
        .pipe( dest( path.build.html ) )
        .pipe( browserSync.stream() );
}
exports.compilePug = compilePug;

// Компиляция SCSS
function compileScss() {
    return src( `${root.src}pages/**/*.scss` )
        .pipe( plumber( {
            errorHandler: notify.onError( {
                title: "Ошибка SCSS",
                message: "Error: <%= error.message %>"
            } )
        } ) )
        .pipe( scss() )
        .pipe( autoprefixer({
            cascade: false
        } ) )
        .pipe( csso({
            comments: false,
            restructure: false
        } ) )
        .pipe( rename({
            dirname: '',
            suffix: '.min'
        } ) )
        .pipe( dest( path.build.css ) )
        .pipe( browserSync.stream() );
}
exports.compileScss = compileScss;

// Сборка JS
function buildJs() {
    return src( [
        `./${root.src}pages/index/index.js`,
        `./${root.src}pages/user/user.js`,
        `./${root.src}pages/catalog/catalog.js`,
        `./${root.src}pages/brands/brands.js`,
        `./${root.src}pages/journal/journal.js`,
    ] )
        .pipe( plumber( {
            errorHandler: notify.onError( {
                title: "Ошибка JS",
                message: "Error: <%= error.message %>"
            } )
        } ) )
        .pipe( webpackStream({
            entry: {
                index: `./${root.src}pages/index/index.js`,
                user: `./${root.src}pages/user/user.js`,
                catalog: `./${root.src}pages/catalog/catalog.js`,
                brands: `./${root.src}pages/brands/brands.js`,
                journal: `./${root.src}pages/journal/journal.js`,
            },
            mode: 'production',
            output: {
                filename: '[name].js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            externals: {
                jquery: 'jQuery'
            }
        } ) )
        .pipe( rename( {
            suffix: '.min'
        } ) )
        .pipe( dest( path.build.js ) )
        .pipe( browserSync.stream() );
}
exports.buildJs = buildJs;

// Перезагрузка браузера
function reload( done ) {
    browserSync.reload();
    done();
}

// Запуск сервера и отслеживание изменений
function serve() {
    browserSync.init( null, {
        server: root.build,
        cors: true,
        notify: false,
        port: 3000,
        startPath: 'index.html',
        open: false,
    } );

    // Разметка
    watch(
        [
            `${root.src}layout/*.pug`,
            `${root.src}pages/**/*.pug`,
            `${root.src}blocks/**/*.pug`,
            `${root.src}theme/icons/*.pug`,
        ],
        { events: ['all'], delay: 100 },
        series( compilePug, reload )
    );

    // Стили
    watch(
        [
            `${root.src}layout/*.scss`,
            `${root.src}pages/**/*.scss`,
            `${root.src}libraries/**/**/*.scss`,
            `${root.src}blocks/**/*.scss`,
        ],
        { events: ['all'], delay: 100 },
        series( compileScss, reload )
    );

    // Скрипты
    watch(
        [
            `${root.src}pages/**/*.js`,
            `${root.src}blocks/**/*.js`
        ],
        { events: ['all'], delay: 100 },
        series( buildJs, reload )
    );

}

exports.build = series(
    parallel(clearBuildDir),
    parallel(compilePug, compileScss, buildJs)
);

exports.default = series(
    parallel(clearBuildDir),
    parallel(compilePug, compileScss, buildJs),
    serve
);