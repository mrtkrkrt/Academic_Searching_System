const neo4j = require("neo4j-driver");
var fs = require('fs');
var xml2js = require('xml2js');

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "admin")
);
const session = driver.session();

var parser = new xml2js.Parser();
fs.readFile('C:/Users/mrtkr/Desktop/Academic_Searching_System/server/data/alev_mutlu.xml', function(err, data) {
  parser.parseString(data, function (err, result) {
      console.dir(result.dblpperson);
      console.log('Done');
  });
});


