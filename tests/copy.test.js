const app = require('../index')

test('app registeres a copy task', () => {
	expect(app).toHaveProperty('copy')
})

test('it copies files', () => {
	app.copy('tests/mocks/src/test-copy.json', 'tests/mocks/public').start('copy-task-2')
})