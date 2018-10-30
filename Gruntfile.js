module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['./node_modules/jspanel4/dist/jspanel.js', './node_modules/uikit/dist/js/uikit.js', './node_modules/uikit/dist/js/uikit-icons.js', './src/build/stupid-console.js'],
                dest: './dist/stupid-console.js'
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            dist : {
                src: ['./node_modules/jspanel4/dist/jspanel.css','./node_modules/uikit/dist/css/uikit.css','./src/styles.css'],
                dest: "./dist/stupid-console.css"
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    './dist/stupid-console.min.js': ['./dist/stupid-console.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat_css', 'cssmin', 'concat', 'uglify']);

};