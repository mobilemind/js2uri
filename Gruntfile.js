"use strict";
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    "nodeunit": {"files": ["test/js2uri*.js"]},
    "pkg": grunt.file.readJSON("package.json")
  });

  // Load plugins: "nodeunit"
  grunt.loadNpmTasks("grunt-contrib-nodeunit");

  // Load local tasks
  grunt.loadTasks("tasks");

  // test
  grunt.registerTask("test", ["nodeunit:files"]);

  // Default task
  grunt.registerTask("default", ["test"]);
};
