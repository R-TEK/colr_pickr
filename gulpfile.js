/*
 * Gulp File
 */

// TODO: Clear directory before either build. include only min file with prodBuild and fill files in devBuild
// TODO: Remove e11 directory

// Importing required dependencies
const gulp = require('gulp');
const concatJS = require('gulp-concat');
const uglifyJS = require('gulp-uglify-es').default;
const concatCSS = require('gulp-concat-css');
const uglifyCSS = require('gulp-uglifycss');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

// Moving, concatenating and minifying my own script (.js) files - DEV BUILD
gulp.task('devScripts', async function () {
	gulp.src(['src/js/setup.js', 'src/js/*.js'])
		.pipe(concatJS('colr_pickr.js'))
		.pipe(gulp.dest('build'));
});

// Compiling SASS and minifying files - DEV BUILD
gulp.task('devSass', async function () {
	gulp.src('src/scss/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('build'));
});

// Moving, concatenating and minifying my own script (.js) files - PRODUCTION BUILD
gulp.task('productionScripts', async function () {
	gulp.src(['src/js/setup.js', 'src/js/*.js'])
		.pipe(concatJS('colr_pickr_min.js'))
		.pipe(uglifyJS())
		.pipe(gulp.dest('build'));
});

// TODO: Change to have a . instead of _ in css files

// Compiling SASS and minifying files - PRODUCTION BUILD
gulp.task('productionSass', async function () {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concatCSS('colr_pickr_min.css'))
		.pipe(uglifyCSS())
		.pipe(gulp.dest('build'));
});

// Watch the edited file and run gulp script on save
gulp.task('watch', function () {
	gulp.watch('src/js/*.js', gulp.series('devScripts'));
	gulp.watch('src/scss/*.scss', gulp.series('devSass'));
});

// Combining multiple tasks into one build - DEV BUILD
gulp.task('devBuild', gulp.series('devScripts', 'devSass'));

// Combining multiple tasks into one build - DEV BUILD
gulp.task(
	'productionBuild',
	gulp.series('productionScripts', 'productionSass', 'devScripts', 'devSass')
);
