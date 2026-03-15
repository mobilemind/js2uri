# js2uri

![repo version](https://img.shields.io/github/package-json/v/mobilemind/js2uri.svg)
 [![Latest version on npmjs.com][npm-image]][npm-url]
 [![Downloads from npmjs.com][npm-downloads]][npm-url]
 [![CodeQL](https://github.com/mobilemind/js2uri/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mobilemind/js2uri/actions/workflows/codeql-analysis.yml)
 [![CI Tests](https://github.com/mobilemind/js2uri/actions/workflows/ci.yml/badge.svg)](https://github.com/mobilemind/js2uri/actions/workflows/ci.yml)
 [![Codacy Badge](https://app.codacy.com/project/badge/Grade/e2c182cf61e942a8bffdc038a7301be9)](https://www.codacy.com/gh/mobilemind/js2uri/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mobilemind/js2uri&amp;utm_campaign=Badge_Grade)

Convert JavaScript to a `javascript:` URI bookmarklet. Works as a standalone
CLI, a Node.js API, or a grunt plugin.

## Zero Dependencies

**js2uri has ZERO production dependencies.** This means:

- **Enhanced Security:** No transitive dependency vulnerabilities
- **Supply Chain Safety:** Minimal attack surface for supply chain attacks
- **Faster Installs:** Nothing to download or install
- **Zero Maintenance Burden:** No dependency updates or compatibility issues
- **Complete Transparency:** Easy to audit and verify

`grunt` is an _optional_ peerDependency — install it separately only if you
use the grunt plugin. Tests use the Node.js built-in test runner.

## Compatibility

**Current Version:** Requires Node.js >=22.22.0 and npm >=11.5.1

Version 1.18.2 harden build & ci for greater resistance against supply chain attack

Version 1.18.1 improved supply security, refined .npmrc, & reduced published package size

Version 1.14.4 drops support & testing for node < 20.19.5 (tests node 25.x & drops 23.x)

Version 1.14.0 drops support & testing for node < 18.20.0

Version 1.13.5 drops support & testing for node < 18.15.0

Version 1.13.0 drops support & testing for node < 18.13.0

Version 1.12.0 drops support & testing for node < 16.14.0

Version 1.11.2 drops support & testing for node < 16.13.0

Version 1.11.0 drops support & testing for node < 16.8.0

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

```sh
npm install js2uri --save-dev
```

### CLI Usage

Convert a file and print to stdout:

```sh
npx js2uri input.min.js
```

Convert a file and write to an output file:

```sh
npx js2uri input.min.js output.uri.js
```

Options:

```
--protocol <proto>   URI protocol prefix (default: javascript:)
--no-void            Omit void'0' suffix
--no-single-quote    Keep %22 instead of replacing with single quotes
--append-version     Append version from package.json
--entity-encode      Encode HTML entities (& < >)
--force-semicolon    Force trailing semicolon
--no-semicolon       Remove trailing semicolon
--version            Print js2uri version
--help               Show help
```

### Node.js API

```javascript
const { js2uriString, js2uriStringReplaces } = require("js2uri");

const uri = js2uriString('alert("hello")', "javascript:", true);
// => 'javascript:alert(%22hello%22)'

const opts = { useSingleQuote: true, appendVoid: true, noLastSemicolon: true,
               forceLastSemicolon: false, entityEncode: false,
               appendVersion: false, customVersion: "" };
const bookmarklet = js2uriStringReplaces(uri, opts);
// => "javascript:alert('hello');void'0'"
```

### Grunt Plugin

#### Edit Gruntfile.js

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
code.

## Release History

1.19.0: add standalone CLI (`bin/js2uri.js`), export helpers as `main`, mark grunt as optional peerDependency, add npm overrides for minimatch 3.1.5 to fix ReDoS vulnerabilities

1.18.0: requires npm >=11.5.1; migrates to npm trusted publishing with OIDC (eliminates token management)

1.17.0: drops support for node < 22.12 and begins "zero dependency" approach
with new CI

1.16.0: drops support for node < 22.12 and begins "zero dependency" approach
with new CI

1.15.4: update test coverage to node 25.x, update to node >=20.19.5 & bump version, update README & regenerate package-lock.json

1.15.3: no functional changes; update ci actions for node 24.x, bump version, update lockfile, republish

1.15.1: no functional change; integrate cspell for use with git pre-push hook,
fix typos, update lockfile

1.15.0: require node ≥ 20.18.0 (node 20 in maintenance mode), drop support for
node 18, bump version, update lockfile

1.14.0: require node ≥ 18.20.0 (node 18 in maintenance mode), bump version,
update lockfile

1.13.6: require node > 18.18.1 (node 18 in maintenance mode)

1.13.0: requires node >18.12.1 & drops node 16 tests; update README & lockfile

1.12.0: requires node >16.14; updated devDependencies with
grunt-contrib-nodeunit 5.0.0

1.11.0: update grunt & node dependencies; now requires node >16.8

1.10.2: update CI & docs, republish w/new npm credentials

1.10.0: drop support for node 12, as 14 becomes node LTS

1.9.0: drop support for node 10, as 12 becomes node LTS

1.8.0: drop snyk as it doubled dependencies & increased build time; rely on renovatebot

1.7.0: drop node 8 support; require node 10+

1.6.3: add `.npmignore` to repo to facilitate `npm publish` ; bump version

1.6.2: at long last properly make `grunt` a _peerDependency_ ; bump version

1.6.0: drop support for node <= 7.0; bump version

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

Copyright (c) 2012-2026 Tom King
Licensed under the MIT license.

<!-- reference URLs -->

[npm-image]: https://img.shields.io/npm/v/js2uri.svg

[npm-downloads]: https://img.shields.io/npm/dm/js2uri.svg

[npm-url]: https://www.npmjs.com/package/js2uri

[grunt]: http://gruntjs.com/

[gruntjs documentation - Configuring Tasks: files]: http://gruntjs.com/configuring-tasks#files

[package.json]: https://docs.npmjs.com/files/package.json

[js2uri 1.2.0]: https://github.com/mobilemind/js2uri/tree/1.2.0
