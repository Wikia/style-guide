'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del'),
	gulpif = require('gulp-if'),
	preprocess = require('gulp-preprocess');

gulp.task('sass', function () {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
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
gulp.task('components-sass', function () {
	var base = './src/components';

	return gulp.src(base + '/**/*.scss')
		.pipe(
			sass({outputStyle: 'compressed'})
				.on('error', sass.logError)
		)
		.pipe(gulp.dest(base));
});
gulp.task('components-svg', function () {
	return gulp.src('./src/components/**/*.svg')
		.pipe(gulp.dest('./dist/components'))
});
gulp.task('components-html', ['components-sass'], function () {
	return gulp.src('./src/components/**/*.html')
		.pipe(preprocess())
		.pipe(gulp.dest('./dist/components'));
});
gulp.task('components', ['components-html'], function () {
	return del.sync('./src/components/**/*.css');
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
