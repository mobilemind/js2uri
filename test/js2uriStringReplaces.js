var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

// globals for js2uri testing
var jsURItest_opt = {
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    appendVersion: false,
    noLastSemicolon: true
  };
var jsURItest_version = '0';
if (undefined !== grunt.config('meta.version')) jsURItest_version = grunt.config('meta.version');
else if (undefined !== grunt.config('pkg.version')) jsURItest_version = grunt.config('pkg.version');

// ** Nodeunit tests **
exports['js2uri'] = {
  setUp: function(done) {
    // setup here
    grunt.config('js2uri.options.dist.src', ['test/null-js']);
    grunt.config('js2uri.options.dist.dest', ['test/null-js.out']);
    grunt.config('js2uri.options.options', jsURItest_opt);
    done();
  },
  'js2uriStringReplaces tests': function(test) {
	test.expect(6);

	// ** default options
	var testVal = '';
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
     ";void'0'",
     'default: "' + testVal + '" should return ";void\'0\'"');

    // ** with trailing semicolon
	jsURItest_opt.noLastSemicolon = false;
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
      ";void'0';",
      'noLastSemicolon:' + jsURItest_opt.noLastSemicolon + ' null should return ";void\'0\';"');

	// ** append version
	jsURItest_opt.appendVersion = true;
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
      ";void'" + jsURItest_version + "';",
      'appendVersion:' + jsURItest_opt.appendVersion + ' null should return ";void\'' + jsURItest_version + '\';"');

	// ** don't append void
	jsURItest_opt.appendVoid = false;
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
      testVal,
      'appendVoid:' + jsURItest_opt.appendVoid + ' null should return "' + testVal + '"');

	// ** useSingleQuote true/false
	testVal = '%22';
	jsURItest_opt.useSingleQuote = true;
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
      "'",
      'useSingleQuote:' + jsURItest_opt.useSingleQuote + ' "' + testVal + '" should return "\'"');

	jsURItest_opt.useSingleQuote = false;
	test.deepEqual(grunt.helper('js2uriStringReplaces', testVal, jsURItest_opt),
      testVal,
      'useSingleQuote:' + jsURItest_opt.useSingleQuote + ' "' + testVal + '" should return "' + testVal + '"');

    test.done();
  }
};
