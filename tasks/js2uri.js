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

// TODO:
// add options for--
// protocol: 'javascript:', // default: 'javascript:'; set as needed. Might be used for custom iOS protocol schemes for instance
// customVersion: 'value',  // default: ''; custom version string (supports "<jsu2ri:pkg.version>" and "<jsu2ri:meta.version>" tokens)
// forceLastSemicolon: false, // default: false' if true forces a trailing semicolon (overrides noLastSemicolon)
//
// ** idea for another plugin **
// html2data - convert HTML page to data URI
//   eg,
//  @printf "data:text/html;charset=utf-8;base64," > $(BUILDDIR)/$@
//  @$(HTMLCOMPRESSOR) $(COMPRESSOPTIONSDATA) $(BUILDDIR)/$^ | base64 >> $(BUILDDIR)/$@
//  Note: should have options for:
//  protocol:	'data:',
//  mimeType:	'text/html',
//  charset:	'utf-8',
//  encoding:	'base64',
// *************************

 // global var
  var jsURI_opt = {
    protocol: 'javascript:',
    useNewlineEOL: true,
    useSingleQuote: true,
    appendVoid: true,
    customVersion: '',
    appendVersion: false,
    noLastSemicolon: true,
    forceLastSemicolon: false
  };


  grunt.registerMultiTask('js2uri', 'Convert JavaScript to javascript: URI.', function() {
    // no processing required for options sub-task
    if ('js2uri:options' === this.nameArgs) return;

    // process js file to create URI
    try {
      // check required config items
      this.requiresConfig(this.name+'.dist.src');
      this.requiresConfig(this.name+'.dist.dest');

      // read file & convert to URI string
      var jsSourceStr =  grunt.file.read(this.file.src);
      var jsURIStr = grunt.helper('js2uriString', jsSourceStr, jsURI_opt.useNewlineEOL);

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
    }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // javascript URI protocol + URI encoding
  grunt.registerHelper('js2uriString', function(jsString, newLineFlag) {
    var myEOL = newLineFlag ? '\n' : '\r\n';
    return jsURI_opt.protocol + encodeURI(jsString.split(myEOL)[0]);
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
        // use 0 *or* version from metadata *or* version from pkg (package.json)
        var pkgVersion = 0;
        if (uriOpts.appendVersion) {
          if (undefined !== uriOpts.customVersion && '' !== uriOpts.customVersion) {} // do something with tokens
          if (undefined !== grunt.config('meta.version')) pkgVersion = grunt.config('meta.version');
          else if (undefined !== grunt.config('pkg.version')) pkgVersion = grunt.config('pkg.version');
        }
        jsURISuffix += "'" + pkgVersion + "';";
      }
      // append suffix which may be null
      uriStr += jsURISuffix;
      // remove trailing semicolon
      if (uriOpts.noLastSemicolon) uriStr = uriStr.replace(lastColonRegex,'');
      return uriStr;
  });

};