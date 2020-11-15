const UrlModel = require('../models/Url');

exports.up = function(knex) {
  return knex.schema
    .createTable('urlTable', (table) => {
      table.increments('id');
      table.string('original_url', 512).notNullable();
      table.string('nanoid', 512).notNullable();
      table.string('short_url', 512).notNullable();
      table.integer('num_referencia').defaultTo(0);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('urlTable');
};
