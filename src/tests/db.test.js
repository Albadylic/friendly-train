const tape = require("tape");
const runDBBuild = require("../database/db_build");
const dbConnection = require("../database/db_connection");
const queries = require("../queries");

tape("Check DB builds with no errors", t => {
  runDBBuild((err, res) => {
    t.error(err, "No error");
    t.equals(Array.isArray(res), true, "Response comes back as an array");
    t.end();
  });
});

tape("Test addUser query adds to DB", t => {
  runDBBuild((err, res) => {
    dbConnection.query("SELECT * FROM users", (err, res) => {
      const expectedBefore = res.rows;
      t.equals(expectedBefore.length, 4, "Length of original array is 4");
      t.false(
        res.rows.includes({ id: 5, name: "testUser", quality: 1 }),
        "Test User does not exist"
      );

      queries.addUser("testUser", 1, err => {
        t.error(err, "No error in insertion");

        dbConnection.query("SELECT * FROM users", (err, res) => {
          const expectedAfter = res.rows;
          t.equals(
            expectedAfter.length,
            5,
            "Length of array after insertion is 5"
          );
          t.equal(
            res.rows[res.rows.length - 1].name,
            "testUser",
            "testUser is added to DB"
          );
          t.end();
        });
      });
    });
  });
});

tape("Test Select user by name query", t => {
  runDBBuild((err, res) => {
    queries.selectUserByName("Dave", (err, res) => {
      const expected = res.rows[0];
      t.equals(expected.id, 4, "Dave's ID is 4");
      t.equals(expected.quality, 1, "Dave's quality has value 1.");
      t.end();
    });
  });
});

tape("Test Select all users query", t => {
  runDBBuild((err, res) => {
    queries.selectAllUsers((err, res) => {
      const expected = res.rows;
      const firstItem = expected[0][0];
      t.equals(expected.length, 4, "There are four items in default array");
      t.equals(firstItem.id, 1, "First item has ID of 1");
      t.equals(firstItem.name, "Alf", "First item has name Alf");
      t.equals(firstItem.quality, 0, "First item has quality 0");

      t.end();
    });
  });
});
