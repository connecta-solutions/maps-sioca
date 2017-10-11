const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require("gulp-util");
const webpack = require("webpack");
const less = require('gulp-less');
const path_node = require('path');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./config/webpack.config.js");
const stream = require('webpack-stream');

let path = {
    HTML: 'src/index.html',
    ALL: ['src/**/*.jsx', 'src/**/*.js', 'styles/**/*/*.css', 'styles/**/*/*.less'],
    MINIFIED_OUT: 'main.js',
    CSS: ['./styles/**/*/*.css', './styles/**/*/*.less'],
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'map-sioca/static',
    DEST: 'dist'
};

gulp.task('webpack', [], function() {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['webpack']);