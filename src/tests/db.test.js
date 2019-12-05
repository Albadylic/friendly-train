const tape = require("tape");
const runDBBuild = require("../database/db_build");
const queries = require("../queries");

tape("Check DB builds with no errors", t => {
  runDBBuild((err, res) => {
    t.error(err, "No error");
    t.equals(Array.isArray(res), true, "Response comes back as an array");
  });
  t.end();
});
