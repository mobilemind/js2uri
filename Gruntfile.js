module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: '<json:package.json>',
    jshint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        strict: false,
        immed: true,
        latedef: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        scripturl: true,
        node: true,
        es5: true
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
