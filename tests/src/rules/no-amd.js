import { RuleTester } from 'eslint'

var ruleTester = new RuleTester()

ruleTester.run('no-amd', require('rules/no-amd'), {
	valid: [
		{ code: 'import "x";', ecmaFeatures: { modules: true } },
		{ code: 'import x from "x"', ecmaFeatures: { modules: true } },
		'var x = require("x")',
		'require("x")',

    // nested scope is fine
    'function x() { define(["a"], function (a) {}) }',
    'function x() { require(["a"], function (a) {}) }',

    // unmatched arg types/number
    'define(0, 1, 2)',
    'define("a")',
	],

	invalid: [
    { code: 'define([], function() {})', errors: [ { message: 'Expected imports instead of AMD define().' }] },
    { code: 'define(["a"], function(a) { console.log(a); })', errors: [ { message: 'Expected imports instead of AMD define().' }] },

		{ code: 'require([], function() {})', errors: [ { message: 'Expected imports instead of AMD require().' }] },
		{ code: 'require(["a"], function(a) { console.log(a); })', errors: [ { message: 'Expected imports instead of AMD require().' }] },
	],
})
