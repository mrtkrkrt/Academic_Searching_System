const neo4j = require("neo4j-driver");
var fs = require("fs");
var xml2js = require("xml2js");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "admin")
);
const session = driver.session();
var parser = new xml2js.Parser();

var teachers = [
  "data/abdurrahman_gün.xml",
  "data/ahmet_sayar.xml",
  "data/alev_mutlu.xml",
  "data/burak_inner.xml",
  "data/burcu_kır_savaş.xml",
  "data/fidan_kaya_gülağız.xml",
  "data/fulya_akdeniz.xml",
  "data/furkan_göz.xml",
  "data/hikmetcan_özcan.xml",
  "data/mehmet_ali_altuncu.xml",
  "data/meltem_kurt_pehlivanoğlu.xml",
  "data/onur_gök.xml",
  "data/orhan_akbulut.xml",
  "data/pınar_onay_durdu.xml",
  "data/sevinc_ilhan_omurca.xml",
  "data/suhap_sahin.xml",
  "data/yasar_becerikli.xml",
];

teachers.forEach((teacher) => {
  fs.readFile(teacher, function (err, data) {
    parser.parseString(data, function (err, result) {
      var authorName = (result.dblpperson.person[0].author[0]._); // getName
      var authorId = (result.dblpperson.person[0].author[0]["$"].pid); // getId
      var coAuthors = (result.dblpperson.coauthors[0]); // getCoAuthors
      for (var i = 0; i < result.dblpperson.r.length; i++) {
        var currentProject = result.dblpperson.r[i].inproceedings
          ? result.dblpperson.r[i].inproceedings[0]
          : result.dblpperson.r[i].article[0];
        var currentProjectId = currentProject["$"].key;
        var currentProjectAuthors = currentProject.author.author;
        var currentProjecTitle = currentProject.title;
        var currentProjectYear = currentProject.year;
        var currentProjectVolume = currentProject.volume;
        var currentProjectNumber = currentProject.number;
        var currentProjectEe = currentProject.ee;
        var currentProjectUrl = currentProject.url;
      }
    });
  });
});

// fs.readFile('C:/Users/mrtkr/Desktop/Academic_Searching_System/server/data/ahmet_sayar.xml', function(err, data) {
//   parser.parseString(data, function (err, result) {
//       console.dir(result.dblpperson.coauthors[0].co[0].na);
//   });
// });

//       for (var i = 0; i < result.dblpperson.person[0].author[0]._.length; i++) {
//         session
//           .run(
//             "CREATE (a:Author {name: $name, id: $id}) RETURN a",
//             {
//               name: result.dblpperson.person[0].author[0]._[i],
//               id: result.dblpperson.person[0].author[0]["$"].pid[i],
//             }
//           )
//           .then(function (result) {
//             // session.close();
//             // driver.close();
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       }

// Projeler içindeki yazarlar birlikte çalışır
// Projeler içindeki yazarlar üzerinde çalışır bizizm proje
