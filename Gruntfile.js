module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },
      build: {
        files: ['src/js/modules/*.js',
                'src/js/components/datasets.js',
                'src/js/*.js',
                'src/scss/*.scss'],
        tasks: ['sass', 'concat', 'build']
      },
    },
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: [
                 {
                     expand: true,
                     cwd: 'src/js/',
                     src: ['**/**.js'],
                     dest: 'tmp/js'
                 }
             ]
        }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'tmp/css/custom.css': 'src/scss/app.scss'
        }
      }
    },
    concat: {
      js: {
        options: {
          separator: ';\n',
        },
        src: [
        'bower_components/es5-shim/es5-shim.min.js',
        'bower_components/papaparse/papaparse.min.js',
        'bower_components/tabletop/src/tabletop.js',
        'bower_components/react/react-with-addons.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/datatables/media/js/jquery.dataTables.min.js',
        'tmp/js/components/*.js',
        'tmp/js/modules/config.js',
        'tmp/js/modules/utils.js',
        'tmp/js/modules/data.js',
        'tmp/js/modules/routes.js',
        'tmp/js/interactions.js',
        'tmp/js/main.js'],
        dest: 'tmp/js/built.js',
      },
      css: {
        src: ['bower_components/pure/pure-min.css',
              'bower_components/datatables/media/css/jquery.dataTables.min.css',
              'tmp/css/custom.css'],
        dest: 'dist/css/app.min.css'
      }
    },
    uglify: {
      js: {
        files: {
          'dist/js/built.min.js': ['tmp/js/built.js']
        }
      }
    },
    clean: {
      build: ['tmp']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['babel', 'sass', 'concat', 'uglify']);
  grunt.registerTask('default', ['connect', 'build', 'clean', 'watch']);
};
