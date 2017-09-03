const path = require('path')

module.exports = {
	resolveSrc(filePattern) {
		return path.join(this.config.srcDir, filePattern)
	},

	resolvePublic(filePattern) {
		return path.join(this.config.baseDir, filePattern)
	},

	/**
	 * wrap simple value in function
	 */
	toFunc(value) {
		return typeof value === 'function'
			? value
			: () => value
	},

	/**
	 * returns just value if input wasn't function; otherwise invoking function
	 */
	saveInvoke(func) {
		return this.toFunc(func)()
	}
}