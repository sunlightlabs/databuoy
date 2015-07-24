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

      concat: {
        files: 'src/js/**/**.js',
        tasks: ['build']
      }
    },
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'tmp/js/compiled.js':'src/js/main.js'
            }
        }
    },
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: [
        'bower_components/tabletop/src/tabletop.js',
        'bower_components/react/react.js',
        'bower_components/jquery/dist/jquery.min.js',
        'src/js/modules/*.js',
        'tmp/js/compiled.js'],
        dest: 'dist/js/built.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('build', ['babel', 'concat']);
  grunt.registerTask('default', ['build','watch']);
};
