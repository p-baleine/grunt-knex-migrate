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
      this.conn = knex({
        client: 'sqlite3',
        connection: {
          filename: __dirname + '/../' + this.definition.database.connection.filename
        },
        useNullAsDefault: true
      });
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      return this.conn.schema.hasTable(this.definition.tableName).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });

  describe('config specified by a staticfile', function() {
    before(function() {
      this.definition = require('./staticfile');
      this.conn = knex({
        client: 'sqlite3',
        connection: {
          filename: __dirname + '/../' + this.definition.database.connection.filename
        },
        useNullAsDefault: true
      });
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      return this.conn.schema.hasTable(this.definition.tableName).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });

  describe('config specified by a staticfile', function() {
    before(function() {
      this.definition = require('./function');
      this.conn = knex({
        client: 'sqlite3',
        connection: {
          filename: __dirname + '/../' + this.definition.database.connection.filename
        },
        useNullAsDefault: true
      });
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../' + this.definition.directory).then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      return this.conn.schema.hasTable(this.definition.tableName).then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });
});
