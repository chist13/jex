const app = require('../index')

test('app registeres pug task', () => {
	expect(app).toHaveProperty('pug')
	expect(app).toHaveProperty('jade')
})

test('it compile pug or jade files into html', () => {
	app.pug('tests/mocks/src/*.{pug,jade}', 'tests/mocks/public').start('pug-task-2')
})