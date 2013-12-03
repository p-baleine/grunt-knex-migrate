module.exports = function(grunt) {
  grunt.initConfig({
    knexmigrate: {
      config: './config.json'
    }
  });

  grunt.loadTasks('../../tasks');
};
