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

module.exports = { addUser };
