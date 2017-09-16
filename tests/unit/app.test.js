const app = require('../../index')

test('there is an app', () => {
	expect(app).not.toBeUndefined()
})

test('it depends on modules', () => {
	expect(app.gulp).not.toBeUndefined()
	expect(app.gulpIf).not.toBeUndefined()
	expect(app.notify).not.toBeUndefined()
})

test('it has initial task on the gulp object', () => {
	expect(Object.keys(app.gulp.tasks)[0]).toBe('initial-task-1')
})

test('it can register a method', () => {
	expect(app.test).toBeUndefined()

	app.use({
		name: 'test',
		handler() {
			return this.task('test', () => {})
		}
	})

	expect(app.test).not.toBeUndefined()
})

test('it can be extended by a trait', () => {
	expect(app.testMethod).toBeUndefined()
	expect(app.testProperty).toBeUndefined()

	app.trait({
		constructor() {
			this.testProperty = 'test working'
		},
		testMethod() {}
	})

	expect(app.testMethod).not.toBeUndefined()
	expect(app.testProperty).toBe('test working')
})