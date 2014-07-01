module.exports = function(grunt) {

    grunt.initConfig({

        ver     : grunt.file.readJSON('ver.json'),          // project version
        module  : grunt.file.readJSON('module.json'),       // project js css module

        // merge minify js
        uglify: {

            global: {
                options: {
                    banner: '/* http://lorem.in  @author Loeify@gmail.com */ \n'
                },
                files: {
                    'dist/global.js': [
                        '<%= module.define %>',
                        '<%= module.pageControl %>',
                        '<%= module.pageInfo %>',
                        '<%= module.setSize %>',
                        '<%= module.loadImage %>',
                        '<%= module.touchDevice %>',
                        '<%= module.sectionMove %>',
                        '<%= module.tapPlot %>',
                        '<%= module.sliderMove %>',
                        '<%= module.sliderControl %>',
                        '<%= module.svgDraw %>',
                        '<%= module.canvasBlur %>',
                        '<%= module.workItem %>',
                        '<%= module.appendImg %>',
                        '<%= module.sliderInfo %>',
                        '<%= module.fullImage %>',
                        'assets/index.js'
                    ]
                }
            },
            
            plugin: {
                options: {
                    banner: '/* jquery.easing | jquery.animate-enhanced | hammer --- see http://lorem.in/LICENSE */ \n'
                },
                files: {
                    'dist/plugin.js': [
                        'static/easing/jquery.easing.js',
                        'static/enhanced/jquery.animate-enhanced.js',
                        'static/hammer/hammer.js',
                        'static/hammer/jquery.hammer.js'
                    ]
                }
            }

        },


        // merge minify css
        cssmin: {

            global: {
                files: {
                    'dist/global.css': [
                        '<%= module.css %>',
                        'assets/index.css'
                    ]
                }
            }

        },

        // replace string
        replace: {

            html: {
                options: {
                    patterns: [
                        {
                            match: 'style',
                            replacement: '<%= grunt.file.read("assets/module/css/base.css") %>'
                        },
                        {
                            match: 'jquery',
                            replacement: '<%= ver.jquery %>'
                        },
                        {
                            match: 'css',
                            replacement: '<%= ver.css %>'
                        },
                        {
                            match: 'plugin',
                            replacement: '<%= ver.plugin %>'
                        },
                        {
                            match: 'js',
                            replacement: '<%= ver.js %>'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['views/*'], dest: '.tmp/' }
                ]
            }

        },

        // minify html
        htmlmin: {

            html: {

                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    'index.html': '.tmp/index.html',
                    'portfolio/index.html': '.tmp/index.html',
                    'about/index.html': '.tmp/index.html'
                }

            }

        },

        // process test html
        processhtml: {

            html: {
                files: {
                    'index.html': ['views/index.html'],
                    'portfolio/index.html': ['views/index.html'],
                    'about/index.html': ['views/index.html']
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
    grunt.registerTask('js', ['uglify:global', 'uglify:plugin']);
    grunt.registerTask('css', ['cssmin:global']);
    grunt.registerTask('html', ['replace:html', 'htmlmin:html']);
    grunt.registerTask('all', ['uglify:global', 'uglify:plugin', 'cssmin:global', 'replace:html', 'htmlmin:html']);

    // for development
    grunt.registerTask('test', ['processhtml:html']);
};
