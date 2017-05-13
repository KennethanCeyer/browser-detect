var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var path = require('path');
var rename = require('gulp-rename');
var root = path.join(__dirname);
var node_modules = path.join(root, 'node_modules');

var paths = {
    scripts: [
        'src/main.js'
    ],
    watch: [
        'src/*.js'
    ]
};

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(requirejsOptimize(function(file) {
            return {
                name: 'main',
                optimize: 'none',
                useStrict: true,
                baseUrl: 'src',
                include: '../node_modules/almond/almond.js'
            };
        }))
        .pipe(concat('browser-detect.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(umd({
            namespace: function(file) {
                return 'browser';
            },
            template: path.join(root, 'templates/returnExports.js')
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('browser-detect.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(paths.watch, ['scripts']);
});

gulp.task('default', ['scripts']);