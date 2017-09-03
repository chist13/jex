const helpers = require('../helpers')

module.exports = {
	_traitConstuctor() {
		this._isProd = helpers.isProd()
		this._isDev = helpers.isDev()
		this._isTest = helpers.isTest()
		this._isWatch = helpers.hasFlag('watch')

		let array = []

		this._isProd && array.push('prod', 'production')
		this._isDev && array.push('dev', 'development')
		this._isTest && array.push('test', 'testing')
		this._isWatch && array.push('watch', 'watching', 'serve', 'server')

		this.envAndFlags = array

		this.middleware('_watcher', this._isWatch)
		this.middleware('_server', this._isWatch)
	},

	thenProd(pipe) {
		return this.gulpIf(this._isProd, pipe)
	},

	thenDev(pipe) {
		return this.gulpIf(this._isDev, pipe)
	},

	thenTest(pipe) {
		return this.gulpIf(this._isTest, pipe)
	},

	thenWatch(pipe) {
		return this.gulpIf(this._isWatch, pipe)
	}
}