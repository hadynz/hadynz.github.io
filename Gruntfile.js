module.exports = function( grunt ) {

    // load time-grunt and all grunt plugins found in the package.json
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );

    grunt.initConfig({

        // Import JSON metadata stored in package.json into the grunt config. Can then use as so: <%= pkg.name %>
        pkg: grunt.file.readJSON('package.json'),

        csslint : {
            test : {
                options : {
                    import : 2
                },
                src : ['css/main.css']
            }
        },

        concat : {
            dist : {
                src : ['css/libs/*.css', 'css/main.css'],
                dest : 'assets/main.css'
            }
        },

        cssmin : {
            dist : {
                src : 'assets/main.css',
                dest : 'assets/main.min.css'
            }
        },

        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },

        watch : {
            files : [
                '_layouts/*.html',
                '_posts/*.markdown',
                'css/*.css',
                'css/libs/*.css',
                '_config.yml',
                'index.html',
                '404.html'
            ],
            tasks : ['concat', 'cssmin','shell:jekyllServe'],
            options : {
                spawn : false,
                interrupt : true,
                atBegin : true,
                livereload : true
            }
        }
    });

    // Load required Grunt tasks

    // Register custom Grunt tasks
    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'deploy', [ 'concat', 'cssmin', 'shell:jekyllBuild' ] )
};