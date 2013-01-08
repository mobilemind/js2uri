# js2uri

grunt plugin to convert a JavaScript file to a `javascript:` URI.

## Example
The code

```javascript
alert("Hello. The current URL is: " + location.href);
```

becomes
```javascript
javascript:alert('Hello.%20The%20current%20URL%20is:%20'%20+%20location.href);void'0'
```

## Getting Started
### Install
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started]
with: `npm install js2uri`

### Edit grunt.js

Add the following to the `grunt.initConfig` section of your project's `grunt.js` file:
```javascript
js2uri:  {
  dist: {
	src: 'dist/lintedAndMinifiedFile.js',
	dest: 'dist/uriVersionOflintedAndMinifiedFile.js'
  }
}
```
Edit the  values for the `src:` (source) and `dest:` (destination) as appropriate.

Below the `grunt.initConfig` section, add this line to your project's `grunt.js`.

```javascript
// load external task
grunt.loadNpmTasks('js2uri');
```

Finally, ensure that `lint` and `min` tasks are called before `js2uri`, such as here:

```javascript
// default task
grunt.registerTask('default', [ "lint", "min", "js2uri"] );
```

## Documentation
_(More coming soon)_

A more elaborated `grunt.js` follows below to clarify expectations and options relating to
`js2uri`.

```javascript
...
lint: {
  files: ['grunt.js', 'src/*.js']
},
// note src & dest options
min: {
  dist: {
	src: ['src/*.js'],
	dest: 'dist/lintedAndMinifiedFile.js'
  }
},
uglify: {
},
watch: {
  files: ['grunt.js', 'src/*.js', 'package.json'],
  tasks: 'lint'
},
// note critical jshint options
jshint: {
  options: {
	strict: false,
	...
	scripturl: true,
	browser: true
  },
  globals: {}
},
// js2uri default options are shown
// note src below IS manually set to dest from 'min' task above
js2uri:  {
  options: {
    protocol: 'javascript:',
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    customVersion: '', // use this if set, ELSE use version from package.jason OR meta. if available
    appendVersion: false,
    noLastSemicolon: true,
    forceLastSemicolon: false
  },
  dist: {
	src: 'dist/lintedAndMinifiedFile.js',
	dest: 'dist/uriVersionOflintedAndMinifiedFile.js'
  }
}
});

// load external task
grunt.loadNpmTasks('js2uri');

// default task
grunt.registerTask('default', [ "lint", "min", "js2uri"] );
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [grunt][grunt].

## Release History
1.0.0 December 31, 2012

1.1.0 January 6, 2013 - adds new options for `protocol:`, `customVersion:`, and `forceLastSemicolon:`.

1.1.1 January 7, 2013 - fix issue reading/setting `noLastSemicolon:` and `forceLastSemicolon:`.

## License
Copyright (c) 2012, 2013 Tom King
Licensed under the MIT license.

<!-- reference URLs -->
[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/0.3-stable/docs/getting_started.md
