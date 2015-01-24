'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del');

gulp.task('sass', function () {
	gulp.src('./src/scss/*.scss')
		.pipe(sass())
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
	gulp.watch('./src/**/*').on('change', function (change) {
		if (change.path.match('scss')) {
			gulp.start('sass');
		} else if (change.path.match('svg')) {
			gulp.start('svg');
		}
		gulp.start('update-static');
	});
});
