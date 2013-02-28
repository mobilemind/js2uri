"use strict";
var grunt = require('grunt');
var js2uriHelpers = require('../tasks/js2uriHelpers.js');
/* ======== A Handy Little Nodeunit Reference ========
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

  // use to set default version to  metadata version OR pkg.version if available
  var jsURItest_version = '';
  if (undefined !== grunt.config('meta.version')) jsURItest_version = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) jsURItest_version = grunt.config('pkg.version');

  var jsURItest_opt = {
    protocol: 'javascript:',
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    customVersion: jsURItest_version,
    appendVersion: false,
    noLastSemicolon: true,
    forceLastSemicolon: false,
    entityEncode: false
  };

  // now REset to use metadata OR pkg if available
  if (undefined !== grunt.config('meta.version')) jsURItest_version = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) jsURItest_version = grunt.config('pkg.version');
  else jsURItest_version = '';


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
    test.expect(16);

    // ** default options
    var testVal = '';
    var expectedVal = ";void'" + ((!jsURItest_opt.appendVersion || '' === jsURItest_version) ? 0 : jsURItest_version) + "'";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #1 default options with "' + testVal + '" should return "' + expectedVal + '"');

    testVal = ';';
    expectedVal = ";void'" + ((!jsURItest_opt.appendVersion || '' === jsURItest_version) ? 0 : jsURItest_version) + "'";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #2 default options with "' + testVal + '" should return "' + expectedVal + '"');

    // ** with trailing semicolon
    jsURItest_opt.noLastSemicolon = false;
    testVal = '';
    expectedVal = ";void'" + ((!jsURItest_opt.appendVersion || '' === jsURItest_version) ? 0 : jsURItest_version) + "';";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #3 noLastSemicolon:' + jsURItest_opt.noLastSemicolon + ' null should return "' + expectedVal + '"');

    jsURItest_opt.noLastSemicolon = false;
    testVal = ';';
    expectedVal = ";void'" + ((!jsURItest_opt.appendVersion || '' === jsURItest_version) ? 0 : jsURItest_version) + "';";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #4 noLastSemicolon:' + jsURItest_opt.noLastSemicolon + ' ";" should return "' + expectedVal + '"');

    // ** append version
    jsURItest_opt.appendVersion = true;
    testVal = '';
    expectedVal = ";void'" + ((!jsURItest_opt.appendVersion || '' === jsURItest_version) ? 0 : jsURItest_version) + "';";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #5 appendVersion:' + jsURItest_opt.appendVersion + ' null should return "' + expectedVal + '"');

    jsURItest_opt.customVersion = '0.0.0';
    testVal = '';
    expectedVal = ";void'" + jsURItest_opt.customVersion + "';";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #6 appendVersion:' + jsURItest_opt.appendVersion + ', customVersion:' + jsURItest_opt.customVersion + ' null should return "' + expectedVal + '"');

    jsURItest_opt.appendVersion = false;
    jsURItest_opt.customVersion = '0.0.0';
    testVal = '';
    expectedVal = ";void'0';";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #7 appendVersion:' + jsURItest_opt.appendVersion + ', customVersion:' + jsURItest_opt.customVersion + ' null should return "' + expectedVal + '"');

    // ** don't append void
    jsURItest_opt.appendVoid= false;
    testVal = '';
    expectedVal = '';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #8 appendVoid:' + jsURItest_opt.appendVoid + ' null should return "' + expectedVal + '"');

    // ** don't append void
    jsURItest_opt.appendVoid= false;
    testVal = ';';
    expectedVal = ';';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #9 appendVoid:' + jsURItest_opt.appendVoid + ' null should return "' + expectedVal + '"');

    // ** useSingleQuote true/false
    jsURItest_opt.useSingleQuote = true;
    jsURItest_opt.appendVoid = false;
    testVal = '%22';
    expectedVal = "'";
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #10 useSingleQuote:' + jsURItest_opt.useSingleQuote + ', appendVoid:' + jsURItest_opt.appendVoid + '"' + testVal + '" should return "' + expectedVal + '"');

    jsURItest_opt.useSingleQuote = false;
    jsURItest_opt.appendVoid = false;
    testVal = '%22';
    expectedVal = testVal;
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #11 useSingleQuote:' + jsURItest_opt.useSingleQuote + ', appendVoid:' + jsURItest_opt.appendVoid + '"' + testVal + '" should return "' + expectedVal + '"');

    // ** forceLastSemicolon true/false
    jsURItest_opt.forceLastSemicolon = true;
    jsURItest_opt.appendVoid = false;
    testVal = '';
    expectedVal = ';';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #12 forceLastSemicolon:' + jsURItest_opt.forceLastSemicolon + ', appendVoid:' + jsURItest_opt.appendVoid + '"' + testVal + '" should return "' + expectedVal + '"');

    jsURItest_opt.forceLastSemicolon = true;
    jsURItest_opt.appendVoid = false;
    testVal = ';';
    expectedVal = ';';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #13 forceLastSemicolon:' + jsURItest_opt.forceLastSemicolon + ', appendVoid:' + jsURItest_opt.appendVoid + '"' + testVal + '" should return "' + expectedVal + '"');

    // ** entityEncode true/false
    jsURItest_opt.forceLastSemicolon = false;
    jsURItest_opt.appendVoid = false;
    jsURItest_opt.entityEncode = true;
    testVal = '0<1&&1>0';
    expectedVal = '0&lt;1&amp;&amp;1&gt;0';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #14 jsURItest_opt.entityEncode:' + jsURItest_opt.entityEncode + ' "' + testVal + '" should return "' + expectedVal + '"');

    jsURItest_opt.forceLastSemicolon = false;
    jsURItest_opt.appendVoid = false;
    jsURItest_opt.entityEncode = true;
    testVal = '0%3C1&&1%3E0';
    expectedVal = '0%3C1&amp;&amp;1%3E0';
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #15 jsURItest_opt.entityEncode:' + jsURItest_opt.entityEncode + ' "' + testVal + '" should return "' + expectedVal + '"');

    jsURItest_opt.forceLastSemicolon = false;
    jsURItest_opt.appendVoid = false;
    jsURItest_opt.entityEncode = false;
    testVal = '0<1&&1>0';
    expectedVal = testVal;
    test.deepEqual(js2uriHelpers.js2uriStringReplaces(testVal, jsURItest_opt), expectedVal,
      'test #16 jsURItest_opt.entityEncode:' + jsURItest_opt.entityEncode + ' "' + testVal + '" should return "' + expectedVal + '"');

    test.done();
  }
};
