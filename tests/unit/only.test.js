const app = require('../../index')

function expectTasks(n) {
	expect(app.stack.length).toBe(n)
}

test('it guards stack', () => {
	expectTasks(1) // initial task

	app.only('prod', 'dev').task(null, n => {})
	expectTasks(1)

	app.only('watch').task(null, n => {})
	expectTasks(1)

	app.only('test').task(null, n => {})
	expectTasks(2)

	app.only('test', 'watch').task(null, n => {})
	expectTasks(3)

	app.only('test').only('watch').task(null, n => {})
	expectTasks(4)
})