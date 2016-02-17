module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '(function(){\n\'use strict;\'\n',
        footer: '})();'
      },
      build: {
        src: ['src/su/datepicker/**/*.js'],
        dest: 'build/su-datepicker.js',
      },
    },
    //clean: ['build'],
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      //run unit tests with karma (server needs to be already running)
      src: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('test', ['build', 'karma:unit']);
};
