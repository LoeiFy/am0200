module.exports = function(grunt) {

    grunt.initConfig({

        ver     : grunt.file.readJSON('ver.json'),          // project version
        module  : grunt.file.readJSON('module.json'),       // project js css module

        // merge minify js
        uglify: {

            app: {
                files: {
                    'dist/app/index.js': [
                        '<%= module.base %>',
                        '<%= module.touch %>',
                        'assets/app/index.js'
                    ]
                }
            },
            
            plugin: {
                options: {
                    banner: '/* jquery.easing | jquery.animate-enhanced | hammer --- see http://lorem.in/LICENSE */ \n'
                },
                files: {
                    'dist/plugin/plugin.js': [
                        'static/easing/jquery.easing.js',
                        'static/enhanced/jquery.animate-enhanced.js',
                        'static/hammer/hammer.min.js',
                        'static/hammer/jquery.hammer.min.js'
                    ]
                }
            }

        },


        // merge minify css
        cssmin: {

            app: {
                files: {
                    'dist/css/global.css': [
                        '<%= module.css %>',
                        'assets/app/index.css'
                    ]
                }
            }

        },

        // replace string
        replace: {

            app: {
                options: {
                    patterns: [
                        {
                            match: 'style',
                            replacement: '<%= grunt.file.read("assets/module/css/base.css") %>'
                        },
                        {
                            match: 'zepto',
                            replacement: '<%= ver.zepto %>'
                        },
                        {
                            match: 'css',
                            replacement: '<%= ver.css %>'
                        },
                        {
                            match: 'index',
                            replacement: '<%= ver.app.index %>'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['views/app/*'], dest: 'html/.tmp/app/' }
                ]
            }

        },

        // minify html
        htmlmin: {

            app: {

                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    'html/app/index.html': 'html/.tmp/app/index.html'
                }

            }

        },

        // process test html
        processhtml: {

            app: {
                files: {
                    'html/app/index.html': ['views/app/index.html']
                }
            }

        }

    });

    // grunt plugin
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');

    // for production 
    grunt.registerTask('app', ['uglify:plugin']);
    grunt.registerTask('css', ['cssmin:app']);
    grunt.registerTask('html', ['replace:app', 'htmlmin:app']);
    grunt.registerTask('all', ['uglify:app', 'cssmin:app', 'replace:app', 'htmlmin:app']);

    // for development
    grunt.registerTask('test', ['processhtml:app']);
};
