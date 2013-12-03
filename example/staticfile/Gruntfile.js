module.exports = function(grunt) {
  grunt.initConfig({
    knexmigrate: './config.json'
  });

  grunt.loadTasks('../../tasks');
};
