const browserify = require('gulp-browserify')
const babelify = require('babelify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

module.exports = {
	name: ['js', 'javascript'],

	handler(input, output) {
		const browserifyConfig = {
			debug: !this._isProd,
			transform: [babelify.configure({
				presets: 'es2015',
				sourceMaps: false
			})]
		}

		return this.task('js', () => {
			this.gulp.src(input)
				.pipe(browserify(browserifyConfig).on('error', this.notify.onError()))
				.pipe(this.whenProd(uglify()))
				.pipe(this.whenProd(rename(path => {path.extname = '.min.js'})))
				.pipe(this.gulp.dest(output))
		}, this.resolveSrc('**/*.js'))
	}

}
