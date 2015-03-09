'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del');

gulp.task('sass', function () {
	gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('svg', function () {
	gulp.src('./src/icons/*.svg')
		.pipe(gulp.dest('./dist/icons'));
});

gulp.task('update-static', function () {
	del('./gh-pages/vendor/wikia-style-guide/dist');
	gulp.src('./dist/**/*')
		.pipe(gulp.dest('./gh-pages/vendor/wikia-style-guide/dist'));
});

gulp.task('watch', function () {
	var stream = gulp.watch('./src/**/*');

	stream.on('change', function () {
		gulp.start(['svg', 'sass'], 'update-static');
	});

	stream.on('error', function (err) {
		console.log(err);
	});
});
