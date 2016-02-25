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
    copy: {
      dist: {
        src: 'build/su-datepicker.js',
        dest: 'dist/su-datepicker.js'
      },
    },
    //clean: ['build'],
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      dist: {
        configFile: 'karma.conf.js',
        files: [
          {src: [
            'lib/angular/1.2.29/angular/angular.js',
            'lib/angular/1.2.29/angular-mocks/angular-mocks.js',

            'dist/su-datepicker.min.js',
            'test/su/datepicker/directives/*Spec.js',
            'test/su/datepicker/filters/*Spec.js'
          ]}
        ],
        exclude : [
          'test/su/datepicker/utilSpec.js'
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/su-datepicker.min.js': ['dist/su-datepicker.js']
        }
      }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '/**\n' +
                  '* @license StudentUniverse su-datepicker <%= pkg.version %>\n' +
                  '* (c) 2016 StudentUniverse https://www.studentuniverse.com\n' +
                  '* License: <%= pkg.license %>\n' +
                  '**/',
          linebreak: true
        },
        files: {
          src: [ 'dist/su-datepicker*' ]
        }
      }
    },
    watch: {
      //run unit tests with karma (server needs to be already running)
      src: {
        files: ['src/**/*.js', 'src/**/*.html'],
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

  grunt.loadNpmTasks('grunt-banner');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['html2js', 'concat']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('dist', ['build', 'copy:dist', 'uglify:dist', 'usebanner:dist']);
  grunt.registerTask('test', ['build', 'karma:unit']);
};
