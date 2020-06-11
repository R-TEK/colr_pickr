'use-strict';

// Defining require dependencies
const gulp = require('gulp');
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

// Moving, concatting and minifying my own script (.js) files
gulp.task('scripts', async function () {
	gulp.src(['src/js/setup.js', 'src/js/*.js'])
		.pipe(concatJS('color_picker.js'))
		//.pipe(uglifyJS())
		.pipe(gulp.dest('build'));
});

// Compiling SASS and minifying files
gulp.task('sass', async function () {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		//.pipe(uglifyCSS())
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/scss/*.scss', gulp.series('sass'));
});

// Combining mulitple tasks into one build
gulp.task('build', gulp.series('scripts', 'sass'));

/*
 * Static site /docs files
 */

// Moving and converting markdown to HTML
gulp.task('siteMarkdown', async function () {
	gulp.src('docs/src/index.html').pipe(markdown()).pipe(gulp.dest('docs'));
});

// Moving, concatting and minifying my own script (.js) files
gulp.task('siteScripts', async function () {
	gulp.src('docs/src/*.js').pipe(concatJS('script.js')).pipe(uglifyJS()).pipe(gulp.dest('docs'));
});

// Moving, concatting and minifying style (.css) files
gulp.task('siteStyles', async function () {
	gulp.src('docs/src/*.css')
		.pipe(concatCSS('style.css'))
		.pipe(uglifyCSS())
		.pipe(gulp.dest('docs'));
});

// Update build on save
gulp.task('siteWatch', function () {
	gulp.watch('docs/src/index.html', gulp.series('siteMarkdown'));
	gulp.watch('docs/src/*.js', gulp.series('siteScripts'));
	gulp.watch('docs/src/*.css', gulp.series('siteStyles'));
});

// Combining mulitple tasks into one build for site build
gulp.task('siteBuild', gulp.series('siteMarkdown', 'siteScripts', 'siteStyles'));
