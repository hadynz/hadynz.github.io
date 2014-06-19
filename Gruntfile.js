'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/plugins/*.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'dist/main.min.css': [
            //'assets/_less/main.less',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/slick-carousel/slick/slick.css',
            'assets/fonts/style.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts.min.js': [
            'bower_components/jquery/dist/*.min.js',
            'bower_components/jquery-throttle-debounce/*.min.js',
            'bower_components/bootstrap/dist/js/*.min.js',
            'bower_components/slick-carousel/slick/*.min.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'assets/images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: '{,*/}*.svg',
          dest: 'assets/images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          'assets/_less/*.less'
        ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint','uglify']
      }
    },
    clean: {
      dist: [
        'dist/main.min.css',
        'dist/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'recess',
    'uglify',
    'imagemin',
    'svgmin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};