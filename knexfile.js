// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/usersDB.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true,
    pool: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done); //might need this later on
    }
  }
};
