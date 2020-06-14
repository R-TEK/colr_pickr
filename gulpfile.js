'use-strict';

// Defining require dependencies
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concatJS = require('gulp-concat');
const uglifyJS = require('gulp-uglify-es').default;
const concatCSS = require('gulp-concat-css');
const uglifyCSS = require('gulp-uglifycss');
const markdown = require('gulp-markdown');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

/*
 * Color picker files
 */

// Moving, concatting and minifying my own script (.js) files - DEV BUILD
gulp.task('devScripts', async function () {
	gulp.src(['src/js/setup.js', 'src/js/*.js'])
		.pipe(concatJS('color_picker.js'))
		.pipe(gulp.dest('build'));
});

// Compiling SASS and minifying files - DEV BUILD
gulp.task('devSass', async function () {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build'));
});

// Moving, concatting and minifying my own script (.js) files - PRODUCTION BUILD
gulp.task('productionScripts', async function () {
	gulp.src(['src/js/setup.js', 'src/js/*.js'])
		.pipe(concatJS('color_picker.js'))
		.pipe(uglifyJS())
		.pipe(gulp.dest('build'));
});

// Compiling SASS and minifying files - PRODUCTION BUILD
gulp.task('productionSass', async function () {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(uglifyCSS())
		.pipe(gulp.dest('build'));
});

gulp.task('babelCompiler', async function () {
	gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(concatJS('color_picker.js'))
		.pipe(uglifyJS())
		.pipe(
			babel({
				presets: [
					[
						'@babel/env',
						{
							modules: false
						}
					]
				]
			})
		)
		.pipe(gulp.dest('build/es5'));
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
	gulp.series('productionScripts', 'productionSass', 'babelCompiler')
);
