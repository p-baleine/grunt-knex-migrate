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
      this.conn = knex.initialize({
        client: 'sqlite3',
        connection: {
          filename: __dirname + '/../test/tmp/simple/db/simple.db'
        }
      });
    });

    it('should create migration file at specified path.', promisify(function() {
      return glob(__dirname + '/../test/tmp/simple/db/migrate/*create_posts.js').then(function(files) {
        expect(files).to.not.be.empty;
      });
    }));

    it('should create migration table as specified name', promisify(function() {
      return this.conn.schema.hasTable('knex_migrations').then(function(exists) {
        return exists ? Promise.resolve() : Promise.reject(new Error('table not exist'));
      });
    }));
  });
});
