module.exports = function(grunt) {

    grunt.initConfig({
        // Склеиваем
        concat: {
            main: {
                src: [
                    'src/**/*.js' 
                ],
                dest: 'dist/mapExpress-leaflet.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    'dist/mapExpress-leaflet.min.js': '<%= concat.main.dest %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};