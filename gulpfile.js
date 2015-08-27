'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del'),
	gulpif = require('gulp-if'),
	preprocess = require('gulp-preprocess'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename");

gulp.task('sass', function () {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('svg:icons', function () {
	return gulp.src('./src/icons/*.svg')
		.pipe(gulp.dest('./dist/icons'));
});

gulp.task('vendor', function () {
	return gulp.src('./src/vendor/**/*')
		.pipe(gulp.dest('./dist/vendor'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/**/*.js')
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('templates', function () {
	return gulp.src('./src/templates/*.html')
		.pipe(gulp.dest('./dist/templates'));
});

gulp.task('svg:images', function () {
	return gulp.src('./src/svg/*.svg')
		.pipe(gulp.dest('./dist/svg'));
});

gulp.task('static:clean', function () {
	return del.sync('./gh-pages/vendor/wikia-style-guide/dist/**');
});

gulp.task('dist:clean', function () {
	return del.sync('./dist/**');
});

/**
 * Set up components:
 *  - Compile SCSS
 *  - Inline JS and CSS into template file
 *  - Move file to dist folder
 */
gulp.task('components-assets', function () {
	var base = './src/components';

	return gulp.src(base + '/**/*.+(scss|js)')
		.pipe(gulpif('*.scss', sass({outputStyle: 'compressed'}).on('error', sass.logError)))
		.pipe(gulpif('*.js', uglify()))
		.pipe(rename(function (path) {
			path.extname = '.min' + path.extname;
		}))
		.pipe(gulp.dest(base));
});

gulp.task('components-svg', function () {
	return gulp.src('./src/components/**/*.svg')
		.pipe(gulp.dest('./dist/components'))
});

gulp.task('components-html', ['components-assets'], function () {
	return gulp.src('./src/components/**/*.html')
		.pipe(preprocess())
		.pipe(gulp.dest('./dist/components'));
});

gulp.task('components', ['components-html', 'components-svg'], function () {
	return del.sync('./src/components/**/*.min.+(css|js)');
});

gulp.task('update-static', [
	'dist:clean',
	'static:clean',
	'svg:icons',
	'svg:images',
	'sass',
	'vendor',
	'scripts',
	'templates',
	'components'
], function () {
	return gulp.src('./dist/**/*')
		.pipe(gulp.dest('./gh-pages/vendor/wikia-style-guide/dist'));
});

gulp.task('watch', ['update-static'], function () {
	gulp.watch('./src/**/*')
		.on('change', function () {
			gulp.start('update-static');
		});
});
