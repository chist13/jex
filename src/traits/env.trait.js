module.exports = {
	constructor() {
		this._isProd = this._isEnv(['prod', 'production'])
		this._isDev = this._isEnv(['dev', 'development'])
		this._isTest = this._isEnv(['test', 'testing'])

		this._isWatch = this._hasFlag('watch')

		let array = []

		this._isProd && array.push('prod', 'production')
		this._isDev && array.push('dev', 'development')
		this._isTest && array.push('test', 'testing')
		this._isWatch && array.push('watch', 'watching', 'serve', 'server')

		this.envAndFlags = array

		this.middleware('_watcher', this._isWatch)
		this.middleware('_server', this._isWatch)
	},

	whenProd(pipe) {
		return this.gulpIf(this._isProd, pipe)
	},

	whenDev(pipe) {
		return this.gulpIf(this._isDev, pipe)
	},

	whenTest(pipe) {
		return this.gulpIf(this._isTest, pipe)
	},

	whenWatch(pipe) {
		return this.gulpIf(this._isWatch, pipe)
	},

	/**
	 * determines if app running in specified mode
	 *
	 * @return Boolean
	 */
	_isEnv(envArray) {
		return envArray.indexOf(process.env['NODE_ENV']) >= 0 || this._hasFlag(...envArray)
	},

	/**
	 * checking if atleast one of arguments includes in flags array
	 *
	 * @return Boolean
	 */
	_hasFlag(...flagNames) {
		return flagNames.some(flagName => process.argv.includes('--' + flagName))
	}
}