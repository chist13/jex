const browserify = require('gulp-browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync')

module.exports = {
	name: ['server'],

	handler(input, output) {
		return this.task('server', () => {
			// config
			const defaultConfig = {
				server: {baseDir: this.config.baseDir},
				port: this.config.port
			}
			const userConfig = this.config.browserSyncConfig

			// injecting css
			this.gulp.watch('public/**/*.css', () => {
				this.gulp
					.src('public/**/*.css')
					.pipe(browserSync.stream())
			})

			// reload browsers
			this.gulp
				.watch(['public/**/*.*', '!public/**/*.css'])
				.on('change', browserSync.reload)

			// start server
			browserSync.init(userConfig ? userConfig : defaultConfig)
		})
	}

}
