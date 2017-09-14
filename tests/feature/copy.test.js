const app = require('../../index')
require('../utilits/functions')

const result = `{
	"test": "working"
}`

test('it can copy files', done => {
	app.copy(resolveMocks('src/test.json'), resolveMocks('dist'))

	waitForFile('dist/test.json', data => {
		if (data != '') {
			expect(data).toBe(result)

			done()
		}
	})
})