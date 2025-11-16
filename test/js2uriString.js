"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const js2uriHelpers = require("../tasks/js2uriHelpers.js");

describe("js2uri", () => {
  test("js2uriString", () => {
    // test URI prefix
    assert.deepEqual(js2uriHelpers.js2uriString("", "", true),
      "", "js2uriString null, protocol null should return null");

    assert.deepEqual(js2uriHelpers.js2uriString("", "javascript:", true),
      "javascript:",
      "js2uriString null, protocol 'javascript:' should return 'javascript:'");

    // test URI reserved and other special chars
    // reserved chars are: ; / ? : @ & = + $ ,
    // plus other potential issues: space, double quote, bracket,
    // single quote, backslash,percent, less/greater than, vertical bar
    let testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    let expectedVal = ";/?:@&=+,%22%20%22%5B%5D'%5C%25%3C%3E%7C";
    assert.deepEqual(js2uriHelpers.js2uriString(testVal, "", true),
      expectedVal,
      `js2uriString '${testVal}' should return '${expectedVal}'`);

    // test valid javascript with chars that are potential encoding issue
    testVal = "var a=[0,1],b=2%3,c='4',r=/^5$/;if(b<6&&b.test(r)||a[1]+1>0){writeln(\"mailto:u2@me.us?body=tested\")}";
    expectedVal = "javascript:var%20a=%5B0,1%5D,b=2%253,c='4',r=/%5E5$/;if(b%3C6&&b.test(r)%7C%7Ca%5B1%5D+1%3E0)%7Bwriteln(%22mailto:u2@me.us?body=tested%22)%7D";
    assert.deepEqual(js2uriHelpers.js2uriString(testVal,
      "javascript:", true),
    expectedVal,
    `js2uriString '${testVal}' should return '${expectedVal}'`);
  });
});
