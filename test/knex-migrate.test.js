/*jshint expr: true, mocha: true*/

var expect = require('chai').expect,
    knex = require('knex'),
    Promise = require('bluebird'),
    glob = Promise.promisify(require('glob'));

function promisify(fn) {
  var _this = this;

  return function(done) {
    return fn.call(this).then(done).catch(done);
  };
}

describe('knexmigrate task', function() {
  describe('config specified by simple object', function() {
    before(function() {
      this.definition = require('./simple');
      this.conn = knex(this.definition.database);
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      var tableName = this.definition.database.migrations.tableName,
          knex = this.conn;

      // We call the currentVersion of the migrations to ensure table creation
      return knex.migrate.currentVersion().then(function(version) {
        return knex.schema.hasTable(tableName);
      }).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });

  describe('config specified by a staticfile', function() {
    before(function() {
      this.definition = require('./staticfile');
      this.conn = knex(this.definition.database);
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      var tableName = this.definition.database.migrations.tableName,
          knex = this.conn;

      // We call the currentVersion of the migrations to ensure table creation
      return knex.migrate.currentVersion().then(function(version) {
        return knex.schema.hasTable(tableName);
      }).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });

  describe('config specified by a staticfile', function() {
    before(function() {
      this.definition = require('./function');
      this.conn = knex(this.definition.database);
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      var tableName = this.definition.database.migrations.tableName,
          knex = this.conn;

      // We call the currentVersion of the migrations to ensure table creation
      return knex.migrate.currentVersion().then(function(version) {
        return knex.schema.hasTable(tableName);
      }).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });
});
