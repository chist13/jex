const app = require('../../index')
require('../utilits/functions')

const result = `(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _testModule = require('./test-module');

var _testModule2 = _interopRequireDefault(_testModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var foo = _testModule2.default;
},{"./test-module":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var func = function func() {};

exports.default = func;
},{}]},{},[1])`

test('it can compile modular es6 into es5', done => {
	app._isDev = true
	app.js(resolveMocks('src/test-modular.js'), resolveMocks('dist'))

	waitForFile('dist/test-modular.js', data => {
		if (data != '') {
			expect(data.includes(result)).toBeTruthy()

			done()
		}
	})
})