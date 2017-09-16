module.exports = {
	constructor() {
		this._limits = {type: '', array: []}

		this.middleware('task', () => this._shouldProceed())
	},

	only(...args) {
		return this._setLimits('only', args)
	},

	except(...args) {
		return this._setLimits('except', args)
	},

	_shouldProceed() {
		let should = true
		const { type: limitType, array: limitArray } = this._limits

		if (limitType === '')
			return should

		should = limitArray.some(e => this.envAndFlags.includes(e))

		this._resetLimits()

		if (limitType === 'only')
			return should

		if (limitType === 'except')
			return !should
	},

	_setLimits(type, array) {
		if (array.some(e => typeof e !== 'string')) {
			throw new Error(`${type} method requires strings as arguments`)
		}
		if (array.some(e => /\s/g.test(e))) {
			throw new Error(`${type} method requires params with no whitespaces`)
		}

		const types = ['only', 'except']

		if (this._limits.type !== '' && type !== this._limits.type) {
			throw new Error('You should not use ONLY METHOD with EXCEPT METHOD together; Use one.')
		}

		this._limits.type = type
		this._limits.array = this._limits.array.concat(array)

		return this
	},

	_resetLimits() {
		this._limits = {type: '', array: []}
	}
}