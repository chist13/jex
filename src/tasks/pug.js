const pug = require('gulp-pug')

module.exports = {
	name: ['pug', 'jade'],

	handler(input, output) {
		const fileNames = this.resolveSrc('**/*.{pug,jade}')

		return this.task(fileNames, () => {
			this.gulp.src(input)
				.pipe(pug({pretty: true}).on('error', this.notify.onError()))
				.pipe(this.gulp.dest(output))
				.pipe(this.thenWatch(this.browserSync.stream()))
		}, 'pug')
	}

}
