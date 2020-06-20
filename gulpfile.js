// Defining require dependencies
const gulp = require('gulp');
const concatJS = require('gulp-concat');
const uglifyJS = require('gulp-uglify-es').default;
const uglifyCSS = require('gulp-uglifycss');
const fileInclude = require('gulp-file-include');

// Include the HTML version of the README markdown in the getting started html file
gulp.task('productionMarkdowns', async function () {
	gulp.src('src/html/getting_started.html', { allowEmpty: true })
		.pipe(
			fileInclude({
				prefix: '@@',
				basepath: '@file'
			})
		)
		.pipe(gulp.dest('dist'));
});

// Moving HTML files to build
gulp.task('productionMarkups', async function () {
	gulp.src(['src/html/*.html', '!src/html/README.html', '!src/html/getting_started.html']).pipe(
		gulp.dest('dist')
	);
});

// Moving, concatenating and minifying library styles (.css) files
gulp.task('productionLibrariesCSS', async function () {
	gulp.src('src/lib/*.css').pipe(concatJS('lib.css')).pipe(uglifyCSS()).pipe(gulp.dest('dist'));
});

// Moving, concatenating and minifying my own styles (.css) files
gulp.task('productionStyles', async function () {
	gulp.src('src/css/*.css').pipe(uglifyCSS()).pipe(gulp.dest('dist'));
});

// Moving, concatenating and minifying library scripts (.js) files
gulp.task('productionLibrariesJS', async function () {
	gulp.src('src/lib/*.js').pipe(concatJS('lib.js')).pipe(uglifyJS()).pipe(gulp.dest('dist'));
});

// Moving, concatenating and minifying my own scripts (.js) files
gulp.task('productionScripts', async function () {
	gulp.src('src/js/*.js').pipe(uglifyJS()).pipe(gulp.dest('dist'));
});

// Watch edited files to update the website
gulp.task('watch', function () {
	gulp.watch('src/html/*.html', gulp.series('productionMarkdowns'));
	gulp.watch('src/html/*.html', gulp.series('productionMarkups'));
	gulp.watch('src/lib/*.css', gulp.series('productionLibrariesCSS'));
	gulp.watch('src/css/*.css', gulp.series('productionStyles'));
	gulp.watch('src/lib/*.js', gulp.series('productionLibrariesJS'));
	gulp.watch('src/js/*.js', gulp.series('productionScripts'));
});

// Combining multiple tasks into one
gulp.task(
	'productionSite',
	gulp.series(
		'productionMarkdowns',
		'productionMarkups',
		'productionLibrariesCSS',
		'productionStyles',
		'productionLibrariesJS',
		'productionScripts'
	)
);
