"use strict";
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        strict: true,
        immed: true,
        latedef: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        trailing: true,
        boss: true,
        eqnull: true,
        scripturl: true,
        validthis: true,
        lastsemic: true,
        node: true
      }
    },
    nodeunit: {
      files: ['test/**/*.js']
    }
  });

  // Load "jshint" plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load "nodeunit" plugin
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks
  grunt.loadTasks('tasks');

  // Default task
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
