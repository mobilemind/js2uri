"use strict";
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json")
  });

  // Load local tasks
  grunt.loadTasks("tasks");

  // test task using Node.js built-in test runner
  grunt.registerTask("test", "Run tests using Node.js built-in test runner", function() {
    const done = this.async();
    const { spawn } = require("child_process");
    const testProcess = spawn("node", ["--test", "test/js2uri*.js"], {
      stdio: "inherit"
    });

    testProcess.on("close", (code) => {
      if (code !== 0) {
        grunt.fail.warn(`Tests failed with code ${code}`);
      }
      done(code === 0);
    });
  });

  // Default task
  grunt.registerTask("default", ["test"]);
};
