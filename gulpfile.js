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

gulp.task('svg:icons', function () {
	return gulp.src('./src/icons/*.svg')
		.pipe(gulp.dest('./dist/icons'));
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

gulp.task('vendor', function () {
	return gulp.src('./src/vendor/**/*')
		.pipe(gulp.dest('./dist/vendor'));
});

gulp.task('update-static', ['dist:clean', 'static:clean', 'svg:icons', 'svg:images', 'sass', 'vendor'], function () {
	return gulp.src('./dist/**/*')
		.pipe(gulp.dest('./gh-pages/vendor/wikia-style-guide/dist'));
});

gulp.task('watch', function () {
	gulp.watch('./src/**/*')
		.on('change', function () {
			gulp.start('update-static');
		});
});
