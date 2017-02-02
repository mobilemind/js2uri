'use strict';
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      target: ['Gruntfile.js', 'tasks/text2datauri*.js', 'test/text2datauri*.js']
    },
    nodeunit: {
      files: ['test/js2uri*.js']
    },
    yamllint: {
      files: { src: [ '*.yaml' ] }
    }
  });

  // Load plugins: "eslint", "nodeunit", "yamllint"
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-yamllint');

  // Load local tasks
  grunt.loadTasks('tasks');
 
  // test
  grunt.registerTask('test', ['eslint', 'nodeunit:files', 'yamllint:files' ]);

  // Default task
  grunt.registerTask('default', ['test']);

};
