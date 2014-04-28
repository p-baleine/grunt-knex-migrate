var Promise = require('bluebird'),
    path = require('path'),
    fs = Promise.promisifyAll(require('fs')),
    colors = require('colors'),
    Knex = require('knex'),

    knex;

module.exports = function(grunt) {

  grunt.registerTask('knexmigrate', 'knex\'s migration task.', function(command, name) {
    var done = this.async();

    loadConfig(grunt.config('knexmigrate.config'), grunt.option('config'))
      .then(function(config) {
        // initialize knex
        knex = Knex(config.database);
        return config;
      })
      .then(function(config) {
        // run cmmand
        return commands[command](config, name);
      })
      .spread(function() {
        // log result output
        grunt.log.oklns.apply(grunt.log, arguments);
      })
      .catch(grunt.log.error)
      .finally(done);
  });
};

// knex commands
var commands = {

  // Migrates to the latest configuration.
  latest: function(config) {
    return knex.migrate.latest(config)
      .spread(function(batchNo, log) {
        return log.length === 0 ?
          ['Already up to date'.cyan] :
          ['Batch %d run: %d migrations\n%s'.green, batchNo, log.length,
           log.join('\n').cyan];
      });
    },

  // Creates a new migration, with a given name.
  make: function(config, name) {
    if (!name) { return Promise.reject('The name must be defined'); }

    return knex.migrate.make(name, config)
      .then(function(filename) {
        return ['Migration %s created!'.green, filename];
      });
  },

  // Rollback the last "batch" of migrations that were run.
  rollback: function(config) {
    return knex.migrate.rollback(config)
      .spread(function(batchNo, log) {
        return log.length === 0 ?
          ['Already at the base migration'] :
          ['Batch %d rolled back: %d migrations\n%s', batchNo, log.length,
           log.join('\n').cyan];
      });
  },

  // Retrieves and returns the current migration version.
  currentVersion: function(config) {
    return knex.migrate.currentVersion(config)
      .then(function(version) {
        return ['Current Version: '.green + version.blue];
      });
  }
};

// Load config.
// `config` could be string, function or object.
function loadConfig(config, configFileNameFromOption) {
  // If `configFileNameFromOption` is specified,
  // the specified file name is used instead of `config`.
  if (configFileNameFromOption) {
    return fs.statAsync(configFileNameFromOption).then(function() {
      return require(path.resolve(configFileNameFromOption));
    });
  }

  // If `config` is specified as string, it is treated as
  // config file name.
  if (typeof config === 'string') {
    return fs.statAsync(config).then(function() {
      return require(path.resolve(config));
    });
  }

  // If `config` is specified as function, this function should
  // return config definition object.
  if (typeof config === 'function') { 
    return Promise.promisify(config)();
  }

  // If `config` is specified as object, it is treated as
  // config definition object.
  return Promise.resolve(config);
}
