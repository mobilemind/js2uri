# js2uri [![NPM version](https://badge.fury.io/js/js2uri.svg)](http://badge.fury.io/js/js2uri)

[![Build Status](https://secure.travis-ci.org/mobilemind/js2uri.svg?branch=master)](http://travis-ci.org/mobilemind/js2uri)

grunt plugin to convert a JavaScript file to a URI, such as a `javascript:` bookmarklet
or an iOS app protocol scheme link.

## Compatibility
Version 1.3.0 begins grunt 0.4.0 compatibility and ends compatibility with earlier
versions of grunt. Use [js2uri 1.2.0 ] if you require grunt 0.3.x compatibility.

Version 1.3.14 and above works with node 0.10.x - 0.12.x as the engine.

## Example
The code

```javascript
alert("Hello. The current URL is: " + location.href);
```

becomes
```javascript
javascript:alert('Hello.%20The%20current%20URL%20is:%20'%20+%20location.href);void'0'
```
Note that the "0" in `void'0'` can be used to embed a custom version number in a bookmarklet.

## Getting Started
### Install
Install this grunt plugin next to your project's [Gruntfile.js gruntfile][getting_started]
with: `npm install js2uri --save`. The `--save` options will add `js2uri` to the
_dependencies_ section of your project's [package.json] file.

### Edit Gruntfile.js

Add the following to the `grunt.initConfig` section of your project's `Gruntfile.js` file:
```javascript
js2uri:  {
  'dist/uriVersionOflintedAndMinifiedFile.js': ['dist/lintedAndMinifiedFile.js']
}
```
Edit the  values for the `dist/uriVersion...` (destination) and `dist/linted...` (source)
as appropriate.

Below the `grunt.initConfig` section, add this line to your project's `Gruntfile.js`.

```javascript
// load external task
grunt.loadNpmTasks('js2uri');
```

Finally, ensure that `jshint` and `uglify` tasks are called before `js2uri`, such as here:

```javascript
// default task
grunt.registerTask('default', [ "jshint", "uglify", "js2uri"] );
```

## Documentation
An elaborated `Gruntfile.js` follows below to clarify expectations and options relating to
`js2uri`. Note that as of js2uri v1.3.0 the [grunt] 0.4.x target data formats are
supported for specifying files. See [gruntjs documentation - Configuring Tasks: files].

```javascript
...
// if meta object exists js2uri will tempt to use version as options.customVersion value
meta: {
  version: '1.6.1'
},
// note critical jshint options for strict, scripturl, & browser
jshint: {
  files: ['Gruntfile.js', 'src/*.js'],
  options: {
  strict: false,
  ...
  scripturl: true,
  browser: true
  },
  globals: {}
},
// note compact file spec-- 'destinationfile': ['sourcefile'],
uglify: {
  'dist/lintedAndMinifiedFile.js': ['src/*.js'],
  options: {
    mangle: {toplevel: true},
    squeeze: {sequences: false, conditionals: false, hoist_vars: true},
    codegen: {quote_keys: false}
  }
},
// js2uri default options are shown
// note use of compact form of grunt 0.4.x files spec-- 'destinationfile': ['sourcefile'],
js2uri:  {
  'dist/uriVersionOflintedAndMinifiedFile.js': ['dist/lintedAndMinifiedFile.js'],
  options: {
    protocol: 'javascript:',
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    customVersion: '', // use this if set, ELSE use version from meta above (if available)
    appendVersion: false,
    noLastSemicolon: true,
    forceLastSemicolon: false,
    entityEncode: false
  }
}
});

// Load "jshint" plugin
grunt.loadNpmTasks('grunt-contrib-jshint');

// Load "uglify" plugin
grunt.loadNpmTasks('grunt-contrib-uglify');

// Load "js2uri" plugin
grunt.loadNpmTasks('js2uri');

// Default task
grunt.registerTask('default', [ "jshint", "uglify", "js2uri"] );
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [grunt][grunt].

## Release History
1.3.16: May 15, 2015 - update license info in `package.json` to use new property and SPDX

1.3.15: April 4, 2015 - update devDependencies and copyright info

1.3.14: February 13, 2015 - work with node engine 0.10.x - 0.12.x

1.3.13: January 22, 2015 - update to `grunt-contrib-jshint` 0.11.x; add some stricter checks

1.3.12: June 10, 2014 - update to `grunt-contrib-nodeunit` 0.4.x

1.3.11: April 21, 2014 - update to `grunt-contrib-jshint` 0.10.x

1.3.10: March 26, 2014 - update to `grunt-contrib-jshint` 0.9.x; `grunt-contrib-nodeunit` to 0.3.x

1.3.9: December 27, 2013 - update to `grunt-contrib-jshint` 0.8.x and streamline dependencies

1.3.8: December 9, 2013 - update to `grunt-contrib-jshint` 0.7.x and integrate Travis CI

1.3.7: July 28, 2013 - update to `grunt-contrib-jshint` 0.6.x and `grunt-contrib-nodeunit` 0.2.x

1.3.6: July 12, 2013 - update to require node 0.10.x, and more current grunt-contrib utils

1.3.5: May 20, 2013 - update license URL in `package.json`

1.3.4: May 19, 2013 - `package.json` repository.url uses `https://` instead of `git://`
and devDependencies updated for jshint (`>=0.1.2 <0.5.0`)

1.3.3: March 12, 2013 - Update `package.json` for node 0.10.0 (ie `node>=0.8.0`)

1.3.2: February 28, 2013 - Better jshint options in Gruntfile.js; package.json updates

1.3.1: February 19, 2013 - Change references to grunt.js to Gruntfile.js, replace directives

1.3.0: February 18, 2013 - Update for compatibility to [grunt] v0.4.x, improved package.json, update README

1.2.0 January 9, 2013 - add more tests, add `entityEncode:` option for encoding '<', '>' and '&'.

1.1.2 January 8, 2013 - add more tests, resolve issues with `appendVersion:false` and `customVersion:`.

1.1.1 January 7, 2013 - fix issue reading/setting `noLastSemicolon:` and `forceLastSemicolon:`.

1.1.0 January 6, 2013 - adds new options for `protocol:`, `customVersion:`, and `forceLastSemicolon:`.

1.0.0 December 31, 2012 - initial release


## License
Copyright (c) 2012-2015 Tom King
Licensed under the MIT license.

<!-- reference URLs -->
[grunt]: http://gruntjs.com/
[gruntjs documentation - Configuring Tasks: files]: http://gruntjs.com/configuring-tasks#files
[getting_started]: http://gruntjs.com/getting-started#the-gruntfile
[package.json]: https://docs.npmjs.com/files/package.json
[js2uri 1.2.0 ]: https://github.com/mobilemind/js2uri/tree/1.2.0
