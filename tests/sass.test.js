const app = require('../index')

test('app registeres a sass task', () => {
	expect(app).toHaveProperty('sass')
	expect(app).toHaveProperty('scss')
})

test('it compile sass or scss files into css', () => {
	app.sass('tests/mocks/src/*.{sass,scss}', 'tests/mocks/public').start('sass-task-2')
})