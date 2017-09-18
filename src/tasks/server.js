const browserify = require('gulp-browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync')

module.exports = {
	name: ['server'],

	handler(input, output) {
		const resolve = this.resolvePublic.bind(this)

		return this.task('server', () => {
			// config
			const defaultConfig = {
				server: {baseDir: this.config.baseDir},
				port: this.config.port
			}
			const userConfig = this.config.browserSyncConfig

			// injecting css
			this.gulp.watch(resolve('**/*.css'), () => {
				this.gulp
					.src(resolve('**/*.css'))
					.pipe(browserSync.stream())
			})

			// reload browsers
			this.gulp
				.watch([resolve('**/*.*'), '!' + resolve('**/*.css')])
				.on('change', browserSync.reload)

			// start server
			browserSync.init(userConfig ? userConfig : defaultConfig)
		})
	}

}
