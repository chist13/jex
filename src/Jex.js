const gulp = require('gulp')
const notify = require('gulp-notify')
const gulpIf = require('gulp-if')

class Jex{
	/**
	 * creates an instance of class
	 */
	constructor() {
		this.gulp = gulp
		this.notify = notify
		this.gulpIf = gulpIf

		this.stack = []
	}

	/**
	 * extends class with trait's feature
	 */
	trait(trait, ...props) {
		Object.assign(this, trait)

		if (this.hasOwnProperty('_traitConstuctor')) {
			this._traitConstuctor(...props)
			delete this._traitConstuctor
		}

		return this
	}

	/**
	 * wrapper for registering new task on gulp
	 */
	task(prefix, cb, watch = null) {
		const taskName = `${prefix ? prefix + '-' : ''}task-${this.stack.length + 1}`

		this.stack.push({
			taskNames: [taskName],
			watch
		})

		this.gulp.task(taskName, cb)

		return this
	}

	/**
	 * attaches new method for users to use
	 */
	use(obj) {
		if (!obj.name)
			throw new Error('name on obj is required')

		if (!obj.handler)
			throw new Error('handler method on obj is required')

		if (this.hasOwnProperty(obj.name))
			throw new Error('current method name is already occupied')

		Array.isArray(obj.name)
			? obj.name.map(e => this[e] = obj.handler)
			: (this[obj.name] = obj.handler)

		return this
	}

	/**
	 * allows to add middleware to methods
	 */
	middleware(methodName, cond) {
		if (!this.hasOwnProperty(methodName)) {
			new Error('trying add middleware to nothing')
		}

		const method = this[methodName]

		this[methodName] = (...args) => this.saveInvoke(cond)
			? method.call(this, ...args)
			: this
	}

	/**
	 * start gulp
	 */
	start(taskName) {
		if (taskName) {
			return this.gulp.start(taskName)
		}

		this._initial()

		setTimeout(n => {
			this._watcher()

			this.gulp.start(this.stack.map(e => e.taskNames))
		}, 0)

		return this
	}

	/**
	 * register watcher task on gulp
	 */
	_watcher() {
		return this.task('watcher', () => {
			this.stack
				.filter(e => e.watch != null)
				.map(e => this.gulp.watch(e.watch, e.taskNames))
		})
	}

	/**
	 * register initial task on gulp for little feedback
	 */
	_initial() {
		return this.task('initial', () => this.notify('Well Done'))
	}

}

module.exports = new Jex