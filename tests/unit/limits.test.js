const app = require('../../index')

test('app has except method', () => {
	expect(typeof app.except === 'function').toBeTruthy()
})

test('it has only method', () => {
	expect(typeof app.only === 'function').toBeTruthy()
})

test('it saving limits for one task', () => {
	app.except('test')

	expect(app._limits.array[0]).toBe('test')
	expect(app._limits.type).toBe('except')

	app.task(null, n => {})

	expect(app._limits.array.length).toBe(0)
})

test('it can has only one type in a row', () => {
	expect(n => { app.only('test').except('dev') }).toThrow()
})

test('it restricted arguments', () => {
	expect(n => { app.only(5) }).toThrow()
	expect(n => { app.only('dev prod watch') }).toThrow()
	expect(n => { app.only(['dev', 'prod', 'watch']) }).toThrow()
	// app.only('dev', 'prod', 'watch') - correct way!
})