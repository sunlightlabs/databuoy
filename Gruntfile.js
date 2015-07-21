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
        files: 'src/js/*.js',
        tasks: ['build']
      }
    },
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: [
        'bower_components/tabletop/src/tabletop.js',
        'bower_components/jquery/dist/jquery.min.js',
        'src/js/*.js'],
        dest: 'dist/built.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['build','watch']);
};
