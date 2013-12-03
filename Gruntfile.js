var matchdep = require('matchdep');

module.exports = function(grunt) {
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {},

    mochacli: {
      all: ['test/**/*.test.js', '!test/tmp/**/*.js']
    },

    clean: {
      example: [],
      test: ['test/tmp']
    },

    mkdir: {
      test: {
        options: {
          create: ['test/tmp/simple/db', 'test/tmp/staticfile/db']
        }
      }
    }
  });

  grunt.registerTask('testrun', 'Test run for knexmigrate', function() {
    // simple object
    grunt.config.set('knexmigrate', {
      directory: './test/tmp/simple/db/migrate',
      tableName: 'knex_migrations',
      database: {
        client: 'sqlite3',
        connection: {
          filename: './test/tmp/simple/db/simple.db'
        }
      }
    });
    grunt.task.run('knexmigrate:make:create_posts');

    // staticfile
    // grunt.config.set('knexmigrate', './test/staticfile.json');
    // grunt.task.run('knexmigrate:make:create_posts');
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean:test', 'mkdir:test', 'testrun', 'mochacli']);
};
