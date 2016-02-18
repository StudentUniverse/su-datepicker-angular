module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '(function(){\n\'use strict\';\n',
        footer: '})();'
      },
      build: {
        src: ['src/su/datepicker/**/*.js', 'tmp/templates.js'],
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
    },
    html2js: {
      options: {
        module: 'su.datepicker.templates.suDatepickerTemplatesModule',
        rename: function (moduleName) {
          return moduleName.replace('.html', '').replace(/\//g, '.');
        },
        quoteChar: '\'',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['src/**/*.html'],
        dest: 'tmp/templates.js'
      },
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['html2js', 'concat']);
  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('test', ['build', 'karma:unit']);
};
