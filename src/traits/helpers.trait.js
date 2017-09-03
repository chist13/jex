const path = require('path')

module.exports = {
	resolveSrc(filePattern) {
		return path.join(this.config.srcDir, filePattern)
	}
}