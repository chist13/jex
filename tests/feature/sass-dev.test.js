const app = require('../../index')
require('../utilits/functions')

const result = `body {
  display: none; }
`

test('it can compile sass into css', done => {
	app._isDev = true
	app.sass(resolveMocks('src/test.sass'), resolveMocks('dist'))

	waitForFile('dist/test.css', data => {
		if (data != '') {
			expect(data).toBe(result)

			done()
		}
	})
})