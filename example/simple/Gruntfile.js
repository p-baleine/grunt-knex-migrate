module.exports = function(grunt) {
  grunt.initConfig({
    knexmigrate: {
      directory: './db/migrate',
      tableName: 'knex_migrations',
      database: {
        client: 'sqlite3',
        connection: {
          filename: './db/simple.db'
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
