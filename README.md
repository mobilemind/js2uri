# js2uri

[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]
[![Dependency Status][dep-image]][dep-url] [![devDependency Status][devDep-image]][devDep-url]
[![Codacy Badge][Codacy-image]][Codacy-dash]

grunt plugin to convert a JavaScript file to a URI, such as a `javascript:`
bookmarklet or an iOS app protocol scheme link.

## Compatibility

Version 1.6.1 and above require node > 9.0.0.

Version 1.3.0 begins grunt 0.4.0 compatibility and ends compatibility with
earlier versions of grunt. Use [js2uri 1.2.0] if you require grunt 0.3.x
compatibility.

Version 1.3.14 and above works with node 0.10.x - 0.12.x as the engine.
Version 1.3.21 extends this to node >= 0.10.0.

Version 1.4.0 begins a focus on the contemporary LTS releases of `node`.

Version 1.6.1 drops support & testing for node < 9.0.0

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

1.6.6: streamline dependencies- move lint outside of package/grunt; bump version

1.6.5: fix Travis-CI issue with dependencies ; bump version

1.6.4: pin dependencies; integrate renovatebot ; bump version

1.6.3: add `.npmignore` to repo to facilitate `npm publish` ; bump version

1.6.2: at long last properly make `grunt` a _peerDependency_ ; bump version

1.6.1: drop support for node < 9.0; bump version

1.6.0: drop support for node <= 7.0; bump version

1.5.2: update dependencies (clears `npm audit` warnings), bump version

1.5.1: update devDependencies for grunt-contrib-nodeunit >= 2.0.0, bump version

1.5.0: drop node 5 support; revise for eslint 4.0.0 reviews, bump version

1.4.6: bump version due to build & publishing tweaks (.eslintrc, package.json)

1.4.5: bump version to republish with improvements for node 8 + npm 5

1.4.4: remove jshint and replace with eslint checks; bump version

1.4.3: add CodeClimate yaml and checks; update based on lint feedback

1.4.2: updated package.json and .travis.tml to use `node` >5.0.0 and `grunt`
">1.0.0"

1.4.1: internals use es6 let/const syntax; build tested with `grunt` 1.0.0 and
updated Travis-CI `.travis.yml` file

1.4.0: update to use LTS releases of `node` (4.x, 5.x) and `grunt-contrib-...`
1.x releases

1.3.24: update package.json to work with `grunt-contrib-jshint` >= 0.11.0

1.3.23: update package.json to work with `grunt-contrib-jshint` 0.11.x -
0.12.x

1.3.22: update .travis.yml to test with `node` 0.10 0.11, 0.12, 4.2 and 5.0

1.3.21: update package.json to support use of `node` >= 0.10.0 (e.g., now
works w/ node 4.0.x)

1.3.20 - 1.3.17: August 3, 2015 - no functional changes. just bumped to
force-update npmjs.com docs

1.3.16: May 15, 2015 - update license info in `package.json` to use new
property and SPDX

1.3.15: April 4, 2015 - update devDependencies and copyright info

1.3.14: February 13, 2015 - work with node engine 0.10.x - 0.12.x

1.3.13: January 22, 2015 - update to `grunt-contrib-jshint` 0.11.x; add some
stricter checks

1.3.12: June 10, 2014 - update to `grunt-contrib-nodeunit` 0.4.x

1.3.11: April 21, 2014 - update to `grunt-contrib-jshint` 0.10.x

1.3.10: March 26, 2014 - update to `grunt-contrib-jshint` 0.9.x;
`grunt-contrib-nodeunit` to 0.3.x

1.3.9: December 27, 2013 - update to `grunt-contrib-jshint` 0.8.x and
streamline dependencies

1.3.8: December 9, 2013 - update to `grunt-contrib-jshint` 0.7.x and integrate
Travis CI

1.3.7: July 28, 2013 - update to `grunt-contrib-jshint` 0.6.x and
`grunt-contrib-nodeunit` 0.2.x

1.3.6: July 12, 2013 - update to require node 0.10.x, and more current
grunt-contrib utils

1.3.5: May 20, 2013 - update license URL in `package.json`

1.3.4: May 19, 2013 - `package.json` repository.url uses `https://` instead of
`git://` and devDependencies updated for jshint (`>=0.1.2 <0.5.0`)

1.3.3: March 12, 2013 - Update `package.json` for node 0.10.0
(ie `node>=0.8.0`)

1.3.2: February 28, 2013 - Better jshint options in Gruntfile.js; package.json
updates

1.3.1: February 19, 2013 - Change references to grunt.js to Gruntfile.js,
replace directives

1.3.0: February 18, 2013 - Update for compatibility to [grunt] v0.4.x,
improved package.json, update README

1.2.0 January 9, 2013 - add more tests, add `entityEncode:` option for
encoding '<', '>' and '&'.

1.1.2 January 8, 2013 - add more tests, resolve issues with
`appendVersion:false` and `customVersion:`.

1.1.1 January 7, 2013 - fix issue reading/setting `noLastSemicolon:` and
`forceLastSemicolon:`.

1.1.0 January 6, 2013 - adds new options for `protocol:`, `customVersion:`,
and `forceLastSemicolon:`.

1.0.0 December 31, 2012 - initial release

## License

Copyright (c) 2012-2018 Tom King
Licensed under the MIT license.

<!-- reference URLs -->

[build-image]: https://secure.travis-ci.org/mobilemind/js2uri.svg?branch=master

[build-url]: https://travis-ci.org/mobilemind/js2uri

[npm-image]: https://img.shields.io/npm/v/js2uri.svg

[npm-url]: https://www.npmjs.com/package/js2uri

[dep-image]: https://david-dm.org/mobilemind/js2uri.svg

[dep-url]: https://david-dm.org/mobilemind/js2uri

[devDep-image]: https://img.shields.io/david/dev/mobilemind/js2uri.svg

[devDep-url]: https://david-dm.org/mobilemind/js2uri#info=devDependencies

[Codacy-image]: https://api.codacy.com/project/badge/Grade/e2c182cf61e942a8bffdc038a7301be9

[Codacy-dash]: https://www.codacy.com/app/mobilemind/js2uri

[grunt]: http://gruntjs.com/

[gruntjs documentation - Configuring Tasks: files]: http://gruntjs.com/configuring-tasks#files

[package.json]: https://docs.npmjs.com/files/package.json

[js2uri 1.2.0]: https://github.com/mobilemind/js2uri/tree/1.2.0
