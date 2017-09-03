const app = require('../index')

test('there is app', () => {
	expect(app).not.toBeUndefined()
})

test('it depends on modules', () => {
	expect(app.gulp).not.toBeUndefined()
	expect(app.gulpIf).not.toBeUndefined()
	expect(app.notify).not.toBeUndefined()
})

test('it has initial task on gulp object', () => {
	expect(Object.keys(app.gulp.tasks)[0]).toBe('initial-task-1')
})