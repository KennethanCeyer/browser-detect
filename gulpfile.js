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
        'node_modules/almond/almond.js',
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
        //.pipe(sourcemaps.init())
        .pipe(requirejsOptimize({
            optimize: 'none'
        }))
        .pipe(concat('browser-detect.js'))
        .pipe(babel({
            "plugins": [
                "check-es2015-constants",
                "transform-es2015-arrow-functions",
                "transform-es2015-block-scoped-functions",
                "transform-es2015-block-scoping",
                "transform-es2015-classes",
                "transform-es2015-computed-properties",
                "transform-es2015-destructuring",
                "transform-es2015-duplicate-keys",
                "transform-es2015-for-of",
                //"transform-es2015-function-name"
                "transform-es2015-literals",
                "transform-es2015-modules-commonjs",
                "transform-es2015-object-super",
                "transform-es2015-parameters",
                "transform-es2015-shorthand-properties",
                "transform-es2015-spread",
                "transform-es2015-sticky-regex",
                "transform-es2015-template-literals",
                "transform-es2015-typeof-symbol",
                "transform-es2015-unicode-regex",
                "transform-regenerator"
            ]
        }))
        .pipe(umd({
            namespace: function(file) {
                return 'browser';
            },
            template: path.join(root, 'templates/returnExports.js')
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(rename('browser-detect.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(paths.watch, ['scripts']);
});

gulp.task('default', ['scripts']);