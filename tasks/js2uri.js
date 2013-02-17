/*
 * grunt-js2uri
 * https://github.com/mobilemind/grunt-js2uri
 *
 * Copyright (c) 2012 Tom King
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // HELPERS
  var js2uriHelpers = require('./js2uriHelpers.js');

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // global var
  var js2uri_pkgVersion = '';
  // default version to  metadata version OR pkg.version if available
  if (undefined !== grunt.config('meta.version')) js2uri_pkgVersion = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) js2uri_pkgVersion = grunt.config('pkg.version');

  // defaults
  var jsURI_opt = {
    protocol: 'javascript:',
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    customVersion: js2uri_pkgVersion,
    appendVersion: false,
    noLastSemicolon: true,
    forceLastSemicolon: false,
    entityEncode: false
  };

  // main function
  grunt.registerTask('js2uri', 'Convert JavaScript to javascript: URI.', function() {
    // no processing required for options sub-task
    if ('js2uri:options' === this.nameArgs) return;

    // process js file to create URI
    try {
      // check required config items
      // grunt.config.requires(this.name + '.dist.src');

      // get config options
      var opts = grunt.config(this.name + '.options');
      if (undefined !== this.options) {
        if (undefined !== opts.protocol)			jsURI_opt.protocol = opts.protocol;
        if (undefined !== opts.useNewlineEOL)		jsURI_opt.useNewlineEOL = opts.useNewlineEOL;
        if (undefined !== opts.useSingleQuote)		jsURI_opt.useSingleQuote = opts.useSingleQuote;
        if (undefined !== opts.appendVoid)			jsURI_opt.appendVoid = opts.appendVoid;
        if (undefined !== opts.customVersion)		jsURI_opt.customVersion = opts.customVersion;
        if (undefined !== opts.appendVersion)		jsURI_opt.appendVersion = opts.appendVersion;
        if (undefined !== opts.noLastSemicolon)		jsURI_opt.noLastSemicolon = opts.noLastSemicolon;
        if (undefined !== opts.forceLastSemicolon)	jsURI_opt.forceLastSemicolon = opts.forceLastSemicolon;
      }

      // read file
      var jsSourceStr =  grunt.file.read(grunt.config(this.name + '.dist.src'));

      // convert javascript string to URI
      var jsURIStr = js2uriHelpers.js2uriString(jsSourceStr, jsURI_opt.protocol, jsURI_opt.useNewlineEOL);

      // apply options to URI string
      jsURIStr = js2uriHelpers.js2uriStringReplaces(jsURIStr, jsURI_opt);

      // write string to file & log
      grunt.file.write(grunt.config(this.name + '.dist.dest'), jsURIStr);
      console.log(grunt.config(this.name + '.dist.src') + ' -> ' + grunt.config(this.name + '.dist.dest') + ' (' + jsURIStr.length + ' bytes)');
    }
    catch(e) {
      grunt.warn(this.nameArgs + ' found errors: ' + e.message  + '\n', 10);
      return false;
    }
    return true;
  });

};
