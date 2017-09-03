const app = require('../index')

function expectTasks(n) {
	expect(app.stack.length).toBe(n)
}

test('it guards stack', () => {
	expectTasks(1) // initial task

	app.except('test').task(null, n => {})
	expectTasks(1)

	app.except('prod').task(null, n => {})
	app.except('dev').task(null, n => {})
	expectTasks(3)
})