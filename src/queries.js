const dbConnection = require("./database/db_connection");

const addUser = (userName, userEnergy, userSociability, userAnimal, cb) => {
  dbConnection.query(
    `INSERT INTO users(name, energy, sociability, animal) VALUES ($1, $2, $3, $4)`,
    [userName, userEnergy, userSociability, userAnimal],
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
