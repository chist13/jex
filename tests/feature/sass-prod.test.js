const app = require('../../index')
require('../utilits/functions')

const result = `body{display:none}`

test('it can compile sass into compressed css', done => {
	app._isProd = true
	app.sass(resolveMocks('src/test.sass'), resolveMocks('dist'))

	waitForFile('dist/test.min.css', data => {
		if (data != '') {
			expect(data).toBe(result)

			done()
		}
	})
})