"use strict";
const js2uriHelpers = require("../tasks/js2uriHelpers.js");
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

exports.js2uri = {
  "setUp": function(done) {
    // setup here
    done();
  },
  "js2uriString tests": function(test) {
    test.expect(4);

    // test URI prefix
    test.deepEqual(js2uriHelpers.js2uriString("", "", true),
      "", "js2uriString null, protocol null should return null");

    test.deepEqual(js2uriHelpers.js2uriString("", "javascript:", true),
      "javascript:", "js2uriString null, protocol 'javascript:' should return 'javascript:'");

    // test URI reserved and other special chars
    // reserved chars are: ; / ? : @ & = + $ ,
    // plus other potential issues: space, double quote, bracket, single quote, backslash,percent, less/greater than, vertical bar
    let testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    let expectedVal = ";/?:@&=+,%22%20%22%5B%5D'%5C%25%3C%3E%7C";
    test.deepEqual(js2uriHelpers.js2uriString(testVal, "", true),
      expectedVal, "js2uriString '" + testVal + "' should return '" + expectedVal + "'");

    // test encoding of valid javascript with chars that are potentially an issue
    testVal = "var a=[0,1],b=2%3,c='4',r=/^5$/;if(b<6&&b.test(r)||a[1]+1>0){writeln(\"mailto:u2@me.us?body=tested\")}";
    expectedVal = "javascript:var%20a=%5B0,1%5D,b=2%253,c='4',r=/%5E5$/;if(b%3C6&&b.test(r)%7C%7Ca%5B1%5D+1%3E0)%7Bwriteln(%22mailto:u2@me.us?body=tested%22)%7D";
    test.deepEqual(js2uriHelpers.js2uriString(testVal, "javascript:", true),
      expectedVal, "js2uriString '" + testVal + "' should return '" + expectedVal + "'");

   test.done();
  }
};
