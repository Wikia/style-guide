'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del');

gulp.task('sass', function () {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./dist/css'));
});

// TODO: handle these more generically instead of one task per directory when all we're doing is moving files
gulp.task('svg:icons', function () {
	return gulp.src('./src/icons/*.svg')
		.pipe(gulp.dest('./dist/icons'));
});

gulp.task('svg:images', function () {
	return gulp.src('./src/svg/*.svg')
		.pipe(gulp.dest('./dist/svg'));
});

gulp.task('vendor', function () {
	return gulp.src('./src/vendor/**/*')
		.pipe(gulp.dest('./dist/vendor'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/**/*')
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('templates', function () {
	return gulp.src('./src/templates/**/*')
		.pipe(gulp.dest('./dist/templates'));
});

gulp.task('static:clean', function () {
	return del.sync('./gh-pages/vendor/wikia-style-guide/dist/**');
});

gulp.task('dist:clean', function () {
	return del.sync('./dist/**');
});

gulp.task('update-static', [
	'dist:clean',
	'static:clean',
	'svg:icons',
	'svg:images',
	'sass',
	'vendor',
	'scripts',
	'templates'
], function () {
	return gulp.src('./dist/**/*')
		.pipe(gulp.dest('./gh-pages/vendor/wikia-style-guide/dist'));
});

gulp.task('watch', function () {
	gulp.watch('./src/**/*')
		.on('change', function () {
			gulp.start('update-static');
		});
});
