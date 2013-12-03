# grunt-knex-migrate

> Grunt task for knex's migrate

## knexmigrate task

`grunt-knex-migrate` receives `knex:migrate` command to the first argument.

### Commands

#### knexmigrate:make:[name]

Creates a new migration, specifying the name for the migration.

#### knexmigrate:latest

Runs migrations for the current config.

#### knexmigrate:rollback

Rolls back the last migration batch.

#### knexmigrate:currentVersion

The current version for the migrations.

### Configuration

Migration configurations are specified in `config` field or by passing file name via command line `--config` option (always command line option precedes). This value could be literal Object, file name or custom function. Migration configurations are below:

#### database

[knex initialize parameters](http://knexjs.org/#Initialize)

#### directory

relative directory from which the migrations should be read & written.

#### tableName

table name for the migrations

### Usage Examples

Please see `example` directory.

#### Via Object

```js
knexmigrate: {
  config: {
    directory: './db/migrate',
    tableName: 'knex_migrations',
    database: {
      client: 'sqlite3',
      connection: {
        filename: './db/simple.db'
      }
    }
  }
}
```

#### Via filename

```js
knexmigrate: {
  config: './config.json'
}
```

#### Via function

```js
knexmigrate: {
  config: function(cb) {
    // calcurate configration
    cb(null, config);
  }
}
```

