const app = require('../../index')
require('../utilits/functions')

const result = `
<div>
  <p>foo</p>
</div>`

test('it can compile pug into html', done => {
	app._isProd = true
	app.pug(resolveMocks('src/test.pug'), resolveMocks('dist'))

	waitForFile('dist/test.html', data => {
		if (data != '') {
			expect(data).toBe(result)

			done()
		}
	})
})