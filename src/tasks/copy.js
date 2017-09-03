const copy = require('gulp-copy')
const path = require('path')

/**
 * counts number of parts delimited with / sign
 * empty strings or the ones consists entirely of * and . symbols ARE not counting
 *
 * //..//* => 0
 * public//foo => 2
 * public//**//* => 1
 *
 * @return Number
 */
function partsCount(pathName) {
	return pathName
		.split('/')
		.filter(e => e && !/^[(*|.)\s]+$/.test(e))
		.length
}

/**
 * Convert string to valid gulp path
 *
 * public, public//, public//**//* => public//**//*
 *
 * @return String
 */
function stringToPath(pathName) {
	const isSimpleString = path.extname(pathName) === '' && pathName.substr(-1) !== '*'

	if (isSimpleString) {
		return pathName.replace(/\/$/, '') + '/**/*'
	}

	return pathName
}

module.exports = {
	name: ['copy'],

	handler(input, output) {
		const prefix = partsCount(input)
		const fileNames = stringToPath(input)

		return this.task(fileNames, () => {
			this.gulp.src(fileNames)
				.pipe(copy(output, {prefix}))
		}, 'copy')
	}

}
