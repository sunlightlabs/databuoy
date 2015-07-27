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
      }
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
        'bower_components/tabletop/src/tabletop.js',
        'bower_components/react/react-with-addons.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/datatables/media/js/jquery.dataTables.min.js',
        'tmp/js/components/*.js',
        'tmp/js/modules/*.js',
        'tmp/js/main.js'],
        dest: 'dist/js/built.js',
      },
      css: {
        src: ['bower_components/pure/pure-min.css',
              'bower_components/datatables/media/css/jquery.dataTables.min.css',
              'tmp/css/custom.css'],
        dest: 'dist/css/app.min.css'
      }
    },
    clean: {
      build: ['tmp']
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.registerTask('build', ['babel', 'sass', 'concat']);
  grunt.registerTask('default', ['build', 'clean', 'watch']);
};
