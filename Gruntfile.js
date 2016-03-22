'use strict';
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'tasks/js2uri*.js', 'test/js2uri*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: ['jshint', 'nodeunit']
    },
    nodeunit: {
      files: ['test/js2uri*.js']
    }
  });

  // Load "jshint" plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load "nodeunit" plugin
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // test
  grunt.registerTask('test',  ['jshint:files', 'nodeunit:files']);

  // Default task
  grunt.registerTask('default', ['test']);

  // Load local tasks
  grunt.loadTasks('tasks');

};
