const pug = require('gulp-pug')

module.exports = {
	name: ['pug', 'jade'],

	handler(input, output) {
		return this.task('pug', () => {
			this.gulp.src(input)
				.pipe(pug({pretty: true}).on('error', this.notify.onError()))
				.pipe(this.gulp.dest(output))
		}, this.resolveSrc('**/*.{pug,jade}'))
	}

}
