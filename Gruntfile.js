'use strict';

module.exports = function (grunt) {

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
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/slick-carousel/slick/slick.css',
                        'assets/fonts/style.css'
                    ]
                }
            }
        },
        copy: {
            dist : {
                src: 'dist/*',
                dest: '_site/'
            },
            css: {
                src: 'assets/css/*',
                dest: '_site/'
            },
            js: {
                src: 'assets/js/*',
                dest: '_site/'
            },
            images: {
                src: 'assets/images/*',
                dest: '_site/'
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
        image_resize: {
            resize: {
                options: {
                    width: 960,
                    height: 720,
                    overwrite: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/images/',
                        src: 'photos/**/*.{png,jpg,jpeg}',
                        dest: 'assets/images/'
                    }
                ]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/images/',
                        src: '**/*.{png,jpg,jpeg}',
                        dest: 'assets/images/'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/images/',
                        src: '**/*.svg',
                        dest: 'assets/images/'
                    }
                ]
            }
        },
        clean: {
            dist: [
                'dist/main.min.css',
                'dist/scripts.min.js'
            ]
        },
        shell: {
            jekyll: {
                command: 'jekyll build --drafts',
                stdout: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '*', // to allow server to be accessed from outside.
                    base: '_site',
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            // Listen to `.less` changes, compile and then copy to _site/dist
            less: {
                files: [ 'assets/_less/**/*.less'],
                tasks: ['recess', 'copy:dist']
            },
            // Listen to `.css` changes and then copy to _site/assets/css
            css: {
                files: ['assets/css/**/*.css'],
                tasks: ['copy:css']
            },
            // Listen to `.js` changes and then copy to _site/assets/js
            js: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint', 'copy:js']
            },
            // Listen to changes in images folders, resize, optimise, svg-optimise and then copy to _site/assets/images
            images: {
                files: ['assets/images/**'],
                tasks: ['image_resize', 'imagemin', 'svgmin', 'copy:images']
            },
            // Listen to any Jekyll file changes and then compile
            jekyll: {
                files: [
                    '_config.yml',
                    '*.md',
                    '{_layouts,_posts,_includes,_data,_posts,_drafts}/**',
                    'assets/{fonts,images}/**'
                ],
                tasks: ['shell:jekyll']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    grunt.registerTask('default', ['shell', 'connect', 'watch']);

};