module.exports = {
	_traitConstuctor() {
		this.config = {
			srcDir: 'src',
			baseDir: 'public',
			port: 8000,
			browserSyncConfig: null
		}
	},

	browserSyncConfig(config) {
		return this._setConfigProperty('browserSyncConfig', config)
	},

	src(path) {
		return this._setConfigProperty('src', path)
	},

	serve(dir) {
		return this._setConfigProperty('baseDir', dir)
	},

	port(port) {
		return this._setConfigProperty('port', port)
	},

	_setConfigProperty(prop, value) {
		this.config[prop] = value

		return this
	}
}