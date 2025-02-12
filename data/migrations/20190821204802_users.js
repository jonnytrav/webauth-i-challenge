exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .text("username", 64)
      .notNullable()
      .unique();
    tbl
      .text("password")
      .notNullable()
      .unique(); //bcrypt makes it unique by adding more to string in password field but just to make sure
  });
};

exports.down = function(knex) {
  // ******   FOREIGN KEYS MUST BE DROPPED FIRST!  *******
  return knex.schema.dropTableIfExists("users");
};
