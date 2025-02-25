// ==========================================================================
// HELPERS
// ==========================================================================
"use strict";
(function(exports) {
  // URI protocol + URI encoding
  exports.js2uriString = function(jsString, uriProtocol, newLineFlag) {
    const myEOL = newLineFlag ? "\n" : "\r\n";
    return String(uriProtocol) + encodeURI(jsString.split(myEOL)[0]);
  };

  // string replacements driven by config options
  exports.js2uriStringReplaces = function(uriStr, uriOpts) {
    const tickRegEx = /%22/gm;
    const lastColonRegex = /;$/;
    let replacedUriStr = uriStr;

    // swap back apostrophes? (most browsers don't require %22 for ')
    if (uriOpts.useSingleQuote) {
      replacedUriStr = replacedUriStr.replace(tickRegEx, "'");
    }

    // build-up suffix
    let jsURISuffix = "";
    if (uriOpts.appendVoid) {
      // append semicolon if needed for syntax
      if (";" !== replacedUriStr.charAt(replacedUriStr.length - 1)) {
        jsURISuffix = ";";
      }
      // append void
      jsURISuffix += "void";
      // use version from options *or* '0'
      let pkgVersion = uriOpts.customVersion;
      if (!uriOpts.appendVersion || undefined === pkgVersion ||
          "" === pkgVersion) {
        pkgVersion = 0;
      }
      jsURISuffix += `'${pkgVersion}';`;
    }

    // append suffix which may be null
    replacedUriStr += jsURISuffix;

    // force OR remove trailing semicolon
    if (uriOpts.forceLastSemicolon) {
      if (";" !== replacedUriStr.charAt(replacedUriStr.length - 1)) {
        replacedUriStr += ";";
      }
    } else if (uriOpts.noLastSemicolon) {
      replacedUriStr = replacedUriStr.replace(lastColonRegex, "");
    }

    // encode critical HTML entities
    if (uriOpts.entityEncode) {
      replacedUriStr = replacedUriStr.
        replace(/&/g, "&amp;").
        replace(/</g, "&lt;").
        replace(/>/g, "&gt;");
    }
    // all replacements done
    return String(replacedUriStr);
  };
}(typeof exports === "object" && exports || this));
