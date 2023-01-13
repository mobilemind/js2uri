# js2uri

![repo version](https://img.shields.io/github/package-json/v/mobilemind/js2uri.svg)
 [![Latest version on npmjs.com][npm-image]][npm-url]
 [![Downloads from npmjs.com][npm-downloads]][npm-url]
 [![CodeQL](https://github.com/mobilemind/js2uri/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mobilemind/js2uri/actions/workflows/codeql-analysis.yml)
 [![NodeJS with Grunt](https://github.com/mobilemind/js2uri/actions/workflows/npm-grunt.yml/badge.svg)](https://github.com/mobilemind/js2uri/actions/workflows/npm-grunt.yml)
 [![Codacy Badge](https://app.codacy.com/project/badge/Grade/e2c182cf61e942a8bffdc038a7301be9)](https://www.codacy.com/gh/mobilemind/js2uri/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mobilemind/js2uri&amp;utm_campaign=Badge_Grade)

grunt plugin to convert a JavaScript file to a URI, such as a `javascript:`
bookmarklet or an iOS app protocol scheme link.

## Compatibility

Version 1.10.0 drops support & testing for node < 14.18.4

Version 1.9.0 drops support & testing for node < 12.0.1

Version 1.8.0 drops snyk in build process as it doubled the dependencies

Version 1.7.0 drops support & testing for node < 10.0.0

Version 1.6.1 drops support & testing for node < 9.0.0

Version 1.4.0 begins a focus on the contemporary LTS releases of `node`.

Version 1.3.0 begins grunt 0.4.0 compatibility and ends compatibility with
earlier versions of grunt. Use [js2uri 1.2.0] if you require grunt 0.3.x
compatibility.

## Example

The code

```javascript
alert("Hi. The active URL is: " + location.href);
```

becomes

```url
javascript:alert('Hi.%20The%20active%20URL%20is:%20'%20+%20location.href);void'0'
```

Note that the "0" in `void'0'` can be used to embed a custom version number in
a bookmarklet.

## Getting Started

### Install

Install this grunt plugin into the project with:
`npm install js2uri --save-dev`. The `--save-dev` option adds `js2uri` to the
_devDependencies_ section of the project [package.json] file.

### Edit Gruntfile.js

Add the following to the `grunt.initConfig` section of the project
`Gruntfile.js` file:

```javascript
"js2uri": {
  "dist/uriVersionOflintedAndMinifiedFile.js": ["dist/lintedAndMinifiedFile.js"]
}
```

Edit the values for the `dist/uriVersion...` (destination) and
`dist/linted...` (source) as appropriate.

Below `grunt.initConfig` section, add this line to the project `Gruntfile.js`.

```javascript
// load external task
grunt.loadNpmTasks("js2uri");
```

Finally, ensure that `jshint` (or `eslint`) and `uglify` tasks are called
before `js2uri`, such as here:

```javascript
// default task
grunt.registerTask("default", ["jshint", "uglify", "js2uri"]);
```

## Documentation

The elaborated `Gruntfile.js` below may clarify expectations and options
relating to `js2uri`. As of js2uri v1.3.0 the [grunt] 0.4.x "target data"
formats are supported for specifying files. See
[gruntjs documentation - Configuring Tasks: files].

```javascript
grunt.initConfig({
  // eslint - Critical eslint rules to disable: no-void, no-script-url
  // Example .eslintrc.yml config file--
  // "env":
  //   "browser": true
  //   "es6": true
  //   "node": true
  // "extends": "eslint:recommended"
  // "rules":
  //   "no-void": 0
  //   "no-script-url": 0
  //
  // jshint - Critical jshint option: browser & scripturl (allow)
  // "jshint": {
  //   "options": {
  //     "browser": true,
  //     "scripturl": true
  //   }
  // },
  //
  // uglify-js - Note: you may need to 'tune' options for your source
  // "uglify": {
  //   "options": {
  //     "codegen": {"quote_keys": false}
  //     "mangle": {"toplevel": true},
  //     "squeeze": {"conditionals": false, "hoist_vars": true, "sequences": false},
  //   }
  // },
  //
  // ** js2uri ** default options are shown
  "js2uri": {
    "options": {
      "appendVersion": false,
      "appendVoid": true,
      "customVersion": "", // use this if set, ELSE use meta shown below (if available)
      "entityEncode": false,
      "forceLastSemicolon": false,
      "noLastSemicolon": true,
      "protocol": "javascript:",
      "useNewlineEOL": true,
      "useSingleQuote": false
    }
  },
  // if meta object exists js2uri will use version as options.customVersion value
  "meta": {
    "version": "1.0.0",
  }
});
// ...
// Load "js2uri" plugin
grunt.loadNpmTasks("js2uri");
// Default task could start w/eslint or jshint
grunt.registerTask("default", ["eslint", "uglify", "js2uri"]);
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test the
code using `eslint` (preferred) or `jshint`.

## Release History

1.10.5: bump version requirements for grunt peerDependency & node; copyright update

1.10.2: update CI & docs, republish w/new npm credentials

1.10.1: drop Travis-CI and rennovate

1.10.0: drop support for node 12, as 14 becomes node LTS

1.9.0: drop support for node 10, as 12 becomes node LTS

1.8.3: update to grunt-contrib-nodeunit 3.0.0, update lockfile

1.8.1: update `grunt` dependencies

1.8.0: drop snyk as it doubled dependencies & increased build time; rely on renovatebot

1.7.0: drop node 8 support; require node 10+

1.6.8: remove optional parens in `test/js2uriStringReplaces.js`; bump version

1.6.7: streamline dependencies- move lint outside of package/grunt; bump version

1.6.4: pin dependencies; integrate renovatebot ; bump version

1.6.3: add `.npmignore` to repo to facilitate `npm publish` ; bump version

1.6.2: at long last properly make `grunt` a _peerDependency_ ; bump version

1.6.0: drop support for node <= 7.0; bump version

1.5.2: update dependencies (clears `npm audit` warnings), bump version

1.5.1: update devDependencies for grunt-contrib-nodeunit >= 2.0.0, bump version

1.5.0: drop node 5 support; revise for eslint 4.0.0 reviews, bump version

1.4.0: update to use LTS releases of `node` (4.x, 5.x) and `grunt-contrib-...`
1.x releases

1.3.0: February 18, 2013 - Update for compatibility to [grunt] v0.4.x,
improved package.json, update README

1.2.0 January 9, 2013 - add more tests, add `entityEncode:` option for
encoding '<', '>' and '&'.

1.1.0 January 6, 2013 - adds new options for `protocol:`, `customVersion:`,
and `forceLastSemicolon:`.

1.0.0 December 31, 2012 - initial release

## License

Copyright (c) 2012-2023 Tom King
Licensed under the MIT license.

<!-- reference URLs -->

[npm-image]: https://img.shields.io/npm/v/js2uri.svg

[npm-downloads]: https://img.shields.io/npm/dm/js2uri.svg

[npm-url]: https://www.npmjs.com/package/js2uri

[grunt]: http://gruntjs.com/

[gruntjs documentation - Configuring Tasks: files]: http://gruntjs.com/configuring-tasks#files

[package.json]: https://docs.npmjs.com/files/package.json

[js2uri 1.2.0]: https://github.com/mobilemind/js2uri/tree/1.2.0
