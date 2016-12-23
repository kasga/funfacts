var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');


gulp.task('sass', function() {
	console.log('scss');
	gulp.src('./sass/**/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer("last 3 version", "safari 5", "ie 9"))
		.pipe(concatCss("styles.css"))
		.pipe(gulp.dest('./'));

});



gulp.task('js', function() {
	gulp.src([
			"./js/dong/**/*.js",
		])
		.pipe(plumber(plumberErrorHandler))

	.pipe(jshint.reporter('default'))
		.pipe(concat('scripts.js'))
		.pipe(uglify({
			'preserveComments': 'all'
		}))
		// .pipe(rename('app.js'))
		.pipe(gulp.dest('./'));

	// gulp.src(['./app/scripts/vendor/*.js'])
	//     .pipe(concat('vendor.js'))
	//     .pipe(gulp.dest('./build/scripts/'));
});



gulp.task('watch', function() {
	gulp.watch(['./sass/**/*.scss'], ['sass']);
	gulp.watch(['./js/dong/**/*.js'], ['js']);
});


var plumberErrorHandler = {
	errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

gulp.task('default', ['sass', 'js', 'watch']);