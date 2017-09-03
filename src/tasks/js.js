const browserify = require('gulp-browserify')
const babelify = require('babelify')
const rename = require('gulp-rename')

module.exports = {
	name: ['js', 'javascript'],

	handler(input, output) {
		const fileNames = this.resolveSrc('**/*.js')
		const isProd = this._isProd

		return this.task(fileNames, () => {
			this.gulp.src(input)
				.pipe(browserify({
					debug: !isProd,
					transform: [babelify.configure({
						minified: isProd,
						presets: 'es2015',
						sourceMaps: false
					})]
				}))
				.pipe(this.whenProd(rename(path => {path.extname = '.min.js'})))
				.pipe(this.gulp.dest(output))
		}, 'js')
	}

}
