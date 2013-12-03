# Example for grunt-knex-migrate configuration via node-config.

`config` field could be specified by function. This function receives node style callback and you can pass configuration object on the fly.

This example uses [node-config](https://github.com/lorenwest/node-config) and migrations for different environment can be run by setting `NODE_ENV` variable.

## Configudation

```js
knexmigrate: {
  config: function(cb) {
    cb(null, require('config'));
  }
}
```

## Run the example

First, create migration file:

```bash
$ grunt knexmigrate:make:create_post
Running "knexmigrate:make:create_posts" (knexmigrate) task
>> Migration 20131203080421_create_posts.js created!
```

Then edit the created migration file:

```js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(t) {
    t.increments().primary();
    t.string('title').notNull();
    t.text('description').notNull();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
```

Run migrations:

```bash
$ grunt knexmigrate:latest
Running "knexmigrate:latest" (knexmigrate) task
>> Batch 1 run: 1 migrations
>> 20131204081849_create_post.js
```

Run migration on `production` environment:

```
$ NODE_ENV=production grunt knexmigrate:latest
Running "knexmigrate:latest" (knexmigrate) task
>> Batch 1 run: 1 migrations
>> 20131204081849_create_post.js
```
