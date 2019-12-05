const dbConnection = require("./database/db_connection");

const addUser = (userName, userQuality, cb) => {
  dbConnection.query(
    `INSERT INTO users(name, quality) VALUES ($1, $2)`,
    [userName, userQuality],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

const selectUserByName = (searchName, cb) => {
  dbConnection.query(
    `SELECT * FROM users WHERE name = $1`,
    [searchName],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

const selectAllUsers = cb => {
  dbConnection.query(`SELECT * FROM users`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = { addUser, selectUserByName, selectAllUsers };
