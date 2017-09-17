const app = require('../../index')
require('../utilits/functions')

const result = `!function e(r,t,n){function u(f,i){if(!t[f]){if(!r[f]){var c="function"==typeof require&&require;if(!i&&c)return c(f,!0);if(o)return o(f,!0);throw new Error("Cannot find module '"+f+"'")}var l=t[f]={exports:{}};r[f][0].call(l.exports,function(e){var t=r[f][1][e];return u(t||e)},l,l.exports,e,r,t,n)}return t[f].exports}for(var o="function"==typeof require&&require,f=0;f<n.length;f++)u(n[f]);return u}({1:[function(e,r,t){"use strict";(function(e){return e&&e.__esModule?e:{default:e}})(e("./test-module")).default},{"./test-module":2}],2:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){}},{}]},{},[1]);`

test('it can compile modular es6 into es5', done => {
	app._isProd = true
	app.js(resolveMocks('src/test-modular.js'), resolveMocks('dist'))

	waitForFile('dist/test-modular.min.js', data => {
		if (data != '') {
			expect(data.includes(result)).toBeTruthy()

			done()
		}
	})
})