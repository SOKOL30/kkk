module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Проверям код
		jshint: {  
	      options: {
	        curly: true,
	        eqeqeq: true,
	        immed: true,
	        latedef: true,
	        newcap: true,
	        noarg: true,
	        sub: true,
	        undef: true,
	        eqnull: true,
	        browser: true,
	        globals: {
	          jQuery: true,
	          $: true,
	          console: true,
			  MapExpress: true,
			  L:true
	        }
	      },
	      '<%= pkg.name %>': { 
	        src: [ 'src/**/*.js' ]  
	      }
	    },
		
		// Склеиваем
        concat: {
            options: {
				separator: ';'
			},
			main: {
                src: [
                    'src/**/*.js' 
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
		
		// Сжимаем
		uglify: {
		    options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
				'dist/<%= pkg.name %>.min.js': ['<%= concat.main.dest %>']
				}
			}
		},
		
		// JS- документация
		jsdoc : {
	        dist : {
	            src: ['src/**/*.js'], 
	            options: {
	                destination: 'doc'
	            }
	        }
		},
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	
	grunt.registerTask('default', ['jshint','concat','uglify','jsdoc']);
};