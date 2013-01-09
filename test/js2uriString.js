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

exports['js2uri'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'js2uriString encoding tests': function(test) {
	test.expect(4);

    // test URI prefix
    test.deepEqual(grunt.helper('js2uriString', '', '', true),
      '',
      'js2uriString null, protocol null should return null');

    test.deepEqual(grunt.helper('js2uriString', '', 'javascript:', true),
      'javascript:',
      'js2uriString null, protocol "javascript:" should return "javascript:"');

    // test encoding of valid javascript with chars that are potentially an issue
    // i.e.: space, equal, bracket, double quote, comma, single quote, percent, semicolon, greater than, brace, plus
    // unescaped test code is: var a=["0","1"],b='0%',c={p:0};if(a[1]>0){writeln("true"+b)}
    test.deepEqual(grunt.helper('js2uriString', "var a=[\"0\",\"1\"],b='0%',c={p:0};if(a[1]>0){writeln(\"true\"+b)}", 'javascript:', true),
      "javascript:var%20a=%5B%220%22,%221%22%5D,b='0%25',c=%7Bp:0%7D;if(a%5B1%5D%3E0)%7Bwriteln(%22true%22+b)%7D",
      "js2uriString {test code} should return- javascript:var%20a=%5B%220%22,%221%22%5D,b='0%25';if(a%5B1%5D%3E0)%7Bwriteln(%22true%22+b)%7D");

    test.deepEqual(grunt.helper('js2uriString', "var a=[\"0\",\"1\"],b='0%',c={p:0};if(a[1]>0){writeln(\"true\"+b)}", '', true),
      "var%20a=%5B%220%22,%221%22%5D,b='0%25',c=%7Bp:0%7D;if(a%5B1%5D%3E0)%7Bwriteln(%22true%22+b)%7D",
      "js2uriString {test code} should return- var%20a=%5B%220%22,%221%22%5D,b='0%25';if(a%5B1%5D%3E0)%7Bwriteln(%22true%22+b)%7D");
    test.done();
  }
};
