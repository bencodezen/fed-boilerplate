const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync')

gulp.task('sass', function() {
	return gulp
		.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			})
		)
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('./src/'))
})

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	})

	gulp.watch('src/scss/*.scss', ['sass'])
	gulp.watch(['*.html', '*.css'], { cwd: 'src' }, browserSync.reload)
})

gulp.task('default', ['sass'])
