var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	axis = require('axis'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel'),
	pug = require('gulp-pug'),
    zip = require('gulp-zip'),
    eslint = require('gulp-eslint'),
    ts = require('gulp-typescript'),
	browserSync = require('browser-sync').create();


gulp.task('serve', function() {

	browserSync.init({
		server: {
			baseDir: "../"
		},
		port: 8080,
		notify: true
	});

	gulp.watch("../frontend/pug/*.pug", gulp.series('pug'));
	gulp.watch("../frontend/scss/**/*.scss", gulp.series('sass'));
	gulp.watch("../frontend/js/*.js", gulp.series('js'));
});

gulp.task('serve_ts', function() {

	browserSync.init({
		server: {
			baseDir: "../"
		},
		port: 8080,
		notify: true
	});

	gulp.watch("../frontend/pug/*.pug", gulp.series('pug'));
	gulp.watch("../frontend/scss/**/*.scss", gulp.series('sass'));	
	gulp.watch("../frontend/ts/*.ts", gulp.series('ts'));
});

gulp.task('pug',  function() {
	return gulp.src('../frontend/pug/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('../'))
		.pipe(browserSync.stream());
});

gulp.task('sass',  function(){
	return gulp.src('../frontend/scss/main.scss')
		.pipe(sass({use: [axis()]}))
		.pipe(cssnano())
		.pipe(autoprefixer(
			['> 0.5%', 'last 2 versions',"ie >= 9", 'Firefox >= 3'],
			{cascade: true,add: true }
		))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('../public/css/'))
		.pipe(browserSync.stream());
});

gulp.task('js',  function() {
	return gulp.src('../frontend/js/*.js')
		.pipe(concat('main.min.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('../public/js/'))
		.pipe(browserSync.stream());
});

gulp.task('ts',  function() {
	return gulp.src('../frontend/ts/*.ts')
		.pipe(ts({
           noImplicitAny: true,
           outFile: 'main.min.js'
       }))
		.pipe(gulp.dest('../public/js/'))
		.pipe(browserSync.stream());
});


gulp.task('zip', function () {
	var globs = [
		'../public/**/*',
		'../*.html'
	];
	return gulp.src(globs)
		.pipe(zip('prod.zip'))
		.pipe(gulp.dest('../compile/'));
});

gulp.task('lint', gulp.series('js', function () {
	return gulp.src('../frontend/js/*.js')
		.pipe(eslint({configFile: './eslintrc.js'}))
		.pipe(eslint.format())
		.pipe(eslint.results(results => {
			// Called once for all ESLint results.
			console.log(`Total Results: ${results.length}`);
			console.log(`Total Warnings: ${results.warningCount}`);
			console.log(`Total Errors: ${results.errorCount}`);
		}))
		.pipe(eslint.failOnError());
}));

gulp.task('prod', gulp.series('lint', 'zip'));
gulp.task('withtype', gulp.series('pug', 'sass', 'ts', 'serve_ts'));
gulp.task('default', gulp.series('pug', 'sass', 'js', 'serve'));
