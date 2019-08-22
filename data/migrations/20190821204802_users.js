exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .text("username", 64)
      .notNullable()
      .unique();
    tbl.text("password").notNullable();
  });
};

exports.down = function(knex) {
  // ******   FOREIGN KEYS MUST BE DROPPED FIRST!  *******
  return knex.schema.dropTableIfExists("users");
};
