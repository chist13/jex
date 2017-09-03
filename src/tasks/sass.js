const path = require('path')

const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const clean = require('gulp-clean-css')
const rename = require('gulp-rename')

module.exports = {
	name: ['sass', 'scss'],

	handler(input, output) {
		const fileNames = this.resolveSrc('**/*.{sass.scss}')

		return this.task(fileNames, () => {
			this.gulp.src(input)
				.pipe(sass.sync({includePaths: path.join(__dirname, 'node_modules')}).on('error', this.notify.onError()))
				.pipe(autoprefixer())
				.pipe(this.thenProd(clean()))
				.pipe(this.thenProd(rename(path => {path.extname = '.min.css'})))
				.pipe(this.gulp.dest(output))
				.pipe(this.thenWatch(this.browserSync.stream()))
		}, 'sass')
	}

}