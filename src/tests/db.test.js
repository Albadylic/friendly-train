const tape = require("tape");
const runDBBuild = require("../database/db_build");
const queries = require("../queries");

tape("Check tape is working", t => {
  t.equal(1, 1, "one equals one");
  t.end();
});
