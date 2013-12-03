module.exports = function(grunt) {
  grunt.initConfig({
    knexmigrate: {
      config: function(cb) {
        cb(null, require('config'));
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
