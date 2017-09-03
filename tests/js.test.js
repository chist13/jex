const app = require('../index')

test('app registeres a js task', () => {
	expect(app).toHaveProperty('js')
	expect(app).toHaveProperty('javascript')
})

test('it compile modular es6 into es5', () => {
	app.js('tests/mocks/src/test-js.js', 'tests/mocks/public').start('js-task-2')
})