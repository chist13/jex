const browserify = require('gulp-browserify')
const babelify = require('babelify')
const rename = require('gulp-rename')

module.exports = {
	name: ['js', 'javascript'],

	handler(input, output) {
		const isProd = this._isProd

		const browserifyConfig = {
			debug: !isProd,
			transform: [babelify.configure({
				minified: isProd,
				presets: 'es2015',
				sourceMaps: false
			})]
		}

		return this.task('js', () => {
			this.gulp.src(input)
				.pipe(browserify(browserifyConfig).on('error', this.notify.onError()))
				.pipe(this.whenProd(rename(path => {path.extname = '.min.js'})))
				.pipe(this.gulp.dest(output))
		}, this.resolveSrc('**/*.js'))
	}

}
