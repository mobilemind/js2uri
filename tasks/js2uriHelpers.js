// ==========================================================================
// HELPERS
// ==========================================================================

(function(exports) {
  // URI protocol + URI encoding
  exports.js2uriString = function(jsString, uriProtocol, newLineFlag) {
    var myEOL = newLineFlag ? '\n' : '\r\n';
    return String(uriProtocol) + encodeURI(jsString.split(myEOL)[0]);
  };

  // string replacements driven by config options
  exports.js2uriStringReplaces = function(uriStr, uriOpts) {
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
      if (!uriOpts.appendVersion || undefined === pkgVersion || '' === pkgVersion) pkgVersion = 0;
      jsURISuffix += "'" + pkgVersion + "';";
    }
    // append suffix which may be null
    uriStr += jsURISuffix;
    // force OR remove trailing semicolon
    if (uriOpts.forceLastSemicolon) {
      if (';' !== uriStr.charAt(uriStr.length-1)) uriStr += ';';
    }
    else if (uriOpts.noLastSemicolon) uriStr = uriStr.replace(lastColonRegex,'');
    // encode critical HTML entities
    if (uriOpts.entityEncode) uriStr = uriStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // all replacements done
    return String(uriStr);
  };
}(typeof exports === 'object' && exports || this));
