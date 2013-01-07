/*
 * grunt-js2uri
 * https://github.com/mobilemind/grunt-js2uri
 *
 * Copyright (c) 2012 Tom King
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

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
    forceLastSemicolon: false
  };

  // main function
  grunt.registerMultiTask('js2uri', 'Convert JavaScript to javascript: URI.', function() {
    // no processing required for options sub-task
    if ('js2uri:options' === this.nameArgs) return;

    // process js file to create URI
    try {
      // check required config items
      this.requiresConfig(this.name+'.dist.src');
      this.requiresConfig(this.name+'.dist.dest');

      // get config options
      var configOptions = grunt.config(this.name+'.options');
      if (undefined !== configOptions) {
        if (undefined !== configOptions.protocol)			jsURI_opt.protocol = configOptions.protocol;
        if (undefined !== configOptions.useNewlineEOL)		jsURI_opt.useNewlineEOL = configOptions.useNewlineEOL;
        if (undefined !== configOptions.useSingleQuote)		jsURI_opt.useSingleQuote = configOptions.useSingleQuote;
        if (undefined !== configOptions.appendVoid)			jsURI_opt.appendVoid = configOptions.appendVoid;
        if (undefined !== configOptions.customVersion)		jsURI_opt.customVersion = configOptions.customVersion;
        if (undefined !== configOptions.appendVersion)		jsURI_opt.appendVersion = configOptions.appendVersion;
        if (undefined !== configOptions.noLastSemicolon)	jsURI_opt.noLastSemicolon = configOptions.noLastSemicolon;
        if (undefined !== configOptions.forceLastSemicolon)	jsURI_opt.noLastSemicolon = configOptions.forceLastSemicolon;
      }

      // read file
      var jsSourceStr =  grunt.file.read(this.file.src);

      // convert javascript string to URI
      var jsURIStr = grunt.helper('js2uriString', jsSourceStr, jsURI_opt.protocol, jsURI_opt.useNewlineEOL);

      // apply options to URI string
      jsURIStr = grunt.helper('js2uriStringReplaces', jsURIStr, jsURI_opt);

      // write string to file & log
      grunt.file.write(this.file.dest, jsURIStr);
      console.log(this.file.src + ' -> ' + this.file.dest + ' (' + jsURIStr.length + ' bytes)');
    }
    catch(e) {
      // log error & warn
      grunt.verbose.or.write('Error with ' + this.nameArgs + ', code:' + e.message);
      grunt.warn(this.nameArgs + ' found errors: ' + e.message, 10);
      return false;
    }
    return true;
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // URI protocol + URI encoding
  grunt.registerHelper('js2uriString', function(jsString, uriProtocol, newLineFlag) {
    var myEOL = newLineFlag ? '\n' : '\r\n';
    return String(uriProtocol) + encodeURI(jsString.split(myEOL)[0]);
  });

  // string replacements driven by config options
  grunt.registerHelper('js2uriStringReplaces', function(uriStr, uriOpts) {
      var tickRegEx = /%22/gm;
      var lastColonRegex = /;$/;
      // swapt use apostrophe? (most browsers don't require %22 for ')
      if (uriOpts.useSingleQuote) uriStr = uriStr.replace(tickRegEx,"'");
      // build-up suffix
      var jsURISuffix = '';
      if (uriOpts.appendVoid) {
        // append semicolon if needed for syntax
        if (';' !== uriStr.charAt(uriStr.length-1)) jsURISuffix = ';';
        // append void
        jsURISuffix += 'void';
        // use version from options *or* '0'
        var pkgVersion = uriOpts.customVersion;
        if (undefined === pkgVersion || '' === pkgVersion) pkgVersion = 0;
        jsURISuffix += "'" + pkgVersion + "';";
      }
      // append suffix which may be null
      uriStr += jsURISuffix;
      // force OR remove trailing semicolon
      if (uriOpts.forceLastSemicolon) {
        if (';' !== uriStr.charAt(uriStr.length-1)) uriStr += ';';
      }
      else if (uriOpts.noLastSemicolon) uriStr = uriStr.replace(lastColonRegex,'');
      // all replacements done
      return String(uriStr);
  });

};