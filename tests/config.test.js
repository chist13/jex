const app = require('../index')

test('it has config', () => {
	expect(app.config).not.toBeUndefined()
})

test('user can set src directory', () => {
	const path = 'resourses'
	app.src(path)

	expect(app.config.src).toBe(path)
})

test('user can set serve directory', () => {
	const dir = 'resourses/markup'
	app.serve(dir)

	expect(app.config.baseDir).toBe(dir)
})

test('user can set serve directory', () => {
	const port = 7579
	app.port(port)

	expect(app.config.port).toBe(port)
})


test('user can set entire browserSync config', () => {
	const config = {foo: 'bar'}
	app.browserSyncConfig(config)

	expect(app.config.browserSyncConfig).toBe(config)
})