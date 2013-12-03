module.exports = function(grunt) {
  grunt.initConfig({
    knexmigrate: function(cb) {
      cb(null, require('config'));
    }
  });

  grunt.loadTasks('../../tasks');
};
