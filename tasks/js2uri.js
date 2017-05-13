/*
 * grunt-js2uri
 * https://github.com/mobilemind/grunt-js2uri
 *
 * Copyright (c) 2012 Tom King
 * Licensed under the MIT license.
 */
"use strict";
module.exports = function(grunt) {
  // HELPERS & PRIVATE VARS
  const js2uriHelpers = require("./js2uriHelpers.js");
  let jsURI_opt = {};

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // main function
  grunt.registerMultiTask("js2uri", "Convert JavaScript to javascript: URI.", function() {
    try {
      // get options
      let js2uri_pkgVersion = "";

      // default version to metadata version OR pkg.version if available
      if (grunt.config("meta.version")) {
        js2uri_pkgVersion = grunt.config("meta.version");
      } else if (grunt.config("pkg.version")) {
        js2uri_pkgVersion = grunt.config("pkg.version");
			}

      // set options
      jsURI_opt = this.options({
        // Default options
        "appendVersion": false,
        "appendVoid": true,
        "customVersion": js2uri_pkgVersion,
        "entityEncode": false,
        "forceLastSemicolon": false,
        "noLastSemicolon": true,
        "protocol": "javascript:",
        "useNewlineEOL": true,
        "useSingleQuote": true
      });

      // loop through files
      const files = this.files;
      files.forEach(function(filepair) {
        // read source
        const jsSourceStr = grunt.file.read(filepair.src);

        // convert javascript string to URI
        let jsURIStr = js2uriHelpers.js2uriString(jsSourceStr, jsURI_opt.protocol, jsURI_opt.useNewlineEOL);

        // apply options to URI string
        jsURIStr = js2uriHelpers.js2uriStringReplaces(jsURIStr, jsURI_opt);

        // write string to file & log results
        grunt.file.write(filepair.dest, jsURIStr);
        console.log(`${filepair.src} -> ${filepair.dest} (${jsURIStr.length} bytes)`);
      });
    } catch (e) {
      grunt.warn(`${this.nameArgs} found errors: ${e.message} \n`, 10);
      return false;
    }
    return true;
  });
};
