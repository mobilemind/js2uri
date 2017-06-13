"use strict";
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    "eslint": {
      "options": {"configFile": ".eslintrc.yml"},
      "target": ["Gruntfile.js", "tasks/*.js", "test/*.js"]
    },
    "nodeunit": {"files": ["test/js2uri*.js"]},
    "pkg": grunt.file.readJSON("package.json"),
    "yamllint": {
      "files": {"src": [".*.yml", "*.yml", "*.yaml"]},
      "options": {"schema": "FAILSAFE_SCHEMA"}
    }
  });

  // Load plugins: "eslint", "nodeunit", "yamllint"
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");
  grunt.loadNpmTasks("grunt-yamllint");

  // Load local tasks
  grunt.loadTasks("tasks");

  // test
  grunt.registerTask("test", ["yamllint", "eslint", "nodeunit:files"]);

  // Default task
  grunt.registerTask("default", ["test"]);
};
