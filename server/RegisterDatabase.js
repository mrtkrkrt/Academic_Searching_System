const neo4j = require("neo4j-driver");
var fs = require("fs");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();

let hocalar_list = [
  "Abdurrahman Gün",
  "Ahmet Sayar",
  "Alev Mutlu",
  "A. Burak Inner",
  "Burcu Kir Savas",
  "Fidan Kaya Gülagiz",
  "Fulya Akdeniz",
  "Furkan Göz",
  "Hikmetcan Ozcan",
  "Mehmet Ali Altuncu",
  "Meltem Kurt PehlIvanoõlu",
  "Onur Gök",
  "Orhan Akbulut",
  "Pinar Onay Durdu",
  "Sevinç Ilhan Omurca",
  "Suhap Sahin",
  "Yasar Becerikli",
  "Kerem Küçük",
  "Nevcihan Duru",
];

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

// async function addAuthor() {
//   teachers.forEach((teacher) => {
//     fs.readFile(teacher, function (err, data) {
//       parser.parseString(data, async function (err, result) {
//         // Add author infos to database
//         const driver = neo4j.driver(
//           "bolt://localhost:7687",
//           neo4j.auth.basic("neo4j", "admin")
//         );
//         const session = driver.session();
//         var authorName = result.dblpperson.person[0].author[0]._; // getName
//         var authorId = result.dblpperson.person[0].author[0]["$"].pid; // getId
//         try {
//           const result = await session.run(
//             "CREATE (a:author {id: $id, name: $name}) RETURN a",
//             { id: authorId, name: authorName }
//           );
//         } finally {
//           await session.close();
//         }
//         await driver.close();
//       });
//     });
//   });
// }
// async function addCoAuthors() {
//   teachers.forEach((teacher) => {
//     fs.readFile(teacher, function (err, data) {
//       parser.parseString(data, async function (err, result) {
//         // Add author infos to database
//         var authorName = result.dblpperson.person[0].author[0]._; // getName
//         var authorId = result.dblpperson.person[0].author[0]["$"].pid; // getId
//         // Add coAuthor to Database
//         for (let i = 0; i < coAuthors.length; i++) {
//           var coAuthorName = coAuthors[i].na[0]._;
//           var coAuthorId = coAuthors[i].na[0].$.pid;
//           if (hocalar_list.includes(coAuthorName)) {
//             const driver = neo4j.driver(
//               "bolt://localhost:7687",
//               neo4j.auth.basic("neo4j", "admin")
//             );
//             const session = driver.session();
//             try {
//               const result = await session.run(
//                 "MATCH (a:author {id: $authorId, name: $authorName}) MATCH (b:author {id:$coAuthorId, name:$coAuthorName}) CREATE (a)-[rel:ORTAK_ÇALIŞIR]->(b)",
//                 {
//                   authorName: authorName,
//                   authorId: authorId,
//                   coAuthorName: coAuthorName,
//                   coAuthorId: coAuthorId,
//                 }
//               );
//             } finally {
//               await session.close();
//             }
//             await driver.close();
//           }
//         }
//       });
//     });
//   });
// }
// async function findAuthor(id, name) {
//   const driver = neo4j.driver(
//     "bolt://localhost:7687",
//     neo4j.auth.basic("neo4j", "admin")
//   );
//   const session = driver.session();
//   try {
//     const result = await session.run(
//       "MATCH (a:author) WHERE a.id = $id AND a.name = $name RETURN a",
//       { id: id, name: name }
//     );
//     if (result.records.length == 0) {
//       const result = await session.run(
//         "CREATE (a:author {id: $id, name: $name}) RETURN a",
//         { id: id, name: name }
//       );
//     }
//   } finally {
//     await session.close();
//   }
// }
// async function checkProjectExists(projectId) {
//   let result;
//   const driver = neo4j.driver(
//     "bolt://localhost:7687",
//     neo4j.auth.basic("neo4j", "admin")
//   );
//   const session = driver.session();
//   try {
//     // result = await session.writeTransaction((tx) => tx.run("MATCH (p:proje {id: $ID}) RETURN p", {ID: projectId}));
//     result = await session.run("MATCH (p:proje {id: $ID}) RETURN p", {
//       ID: projectId,
//     });
//   } finally {
//     await session.close();
//   }
//   await driver.close();
//   return result;
// }
// function addProjectConnection() {
//   let n = 5000;
//   teachers.forEach((teacher) => {
//     setTimeout(() => {
//       fs.readFile(teacher, function (err, data) {
//         parser.parseString(data, async function (err, result) {
//           const driver = neo4j.driver(
//             "bolt://localhost:7687",
//             neo4j.auth.basic("neo4j", "admin")
//           );
//           const session = driver.session();
//           for (var i = 0; i < result.dblpperson.r.length; i++) {
//             var currentProject = result.dblpperson.r[i].inproceedings
//               ? result.dblpperson.r[i].inproceedings[0]
//               : result.dblpperson.r[i].article[0];
//             var currentProjectId = currentProject["$"].key;
//             for (let j = 0; j < currentProject.author.length; j++) {
//               var coAuthorName = currentProject.author[j]._;
//               var coAuthorId = currentProject.author[j].$.pid;
//               let isConnection = await checkRelationship(
//                 coAuthorId,
//                 currentProjectId
//               );
//               if (hocalar_list.includes(coAuthorName)) {
//                 if (isConnection.records.length == 0) {
//                   console.log("EKLEME");
//                   try {
//                     const res = await session.run(
//                       "MATCH (a:author {id: $authorId, name: $authorName}) MATCH (p:proje {id:$projectId}) CREATE (a)-[rel:PROJE_ÇALIŞIR]->(p)",
//                       {
//                         authorName: coAuthorName,
//                         authorId: coAuthorId,
//                         projectId: currentProjectId,
//                       }
//                     );
//                   } finally {
//                     await session.close();
//                   }
//                 }
//               }
//               await driver.close();
//             }
//           }
//         });
//       });
//       n += 15000;
//     }, n);
//   });
// }
// async function checkRelationship(authorId, projectId) {
//   var result;
//   const driver = neo4j.driver(
//     "bolt://localhost:7687",
//     neo4j.auth.basic("neo4j", "admin")
//   );
//   const session = driver.session();
//   try {
//     result = await session.run(
//       "MATCH (a:author {id: $authorId}) MATCH (b:proje {id:$projectId}) RETURN EXISTS ((a)-[:PROJE_ÇALIŞIR]->(b))",
//       {
//         authorId: authorId,
//         projectId: projectId,
//       }
//     );
//   } finally {
//     await session.close();
//   }
//   await driver.close();
//   return result;
// }

async function addProject() {
  let n = 5000;
  teachers.forEach((teacher) => {
    setTimeout(() => {
      fs.readFile(teacher, function (err, data) {
        parser.parseString(data, async function (err, result) {
          for (var i = 0; i < result.dblpperson.r.length; i++) {
            var currentProject = result.dblpperson.r[i].inproceedings
              ? result.dblpperson.r[i].inproceedings[0]
              : result.dblpperson.r[i].article[0];
            var currentProjectId = currentProject["$"].key;
            var currentProjecTitle = currentProject.title;
            var currentProjectYear = currentProject.year;
            var currentProjectEe = currentProject.ee;
            var currentProjectUrl = currentProject.url;
            var authors = currentProject.author; // getCoAuthors
            const driver = neo4j.driver(
              "bolt://localhost:7687",
              neo4j.auth.basic("neo4j", "admin")
            );

            for (let j = 0; j < authors.length; j++) {
              var authorName = authors[j]._;
              var authorId = authors[j].$.pid;
              const session = driver.session();
              try {
                if (hocalar_list.includes(authorName)) {
                  const res = await session.run(
                    "MERGE (p:proje {id: $id, title: $title, year: $year}) MERGE (a:author {id: $authorId, name: $authorName}) MERGE (p)-[:YAZAN]->(a)",
                    {
                      id: currentProjectId,
                      title: currentProjecTitle,
                      year: currentProjectYear,
                      authorId: authorId,
                      authorName: authorName,
                    }
                  );
                }
              } finally {
                await session.close();
              }
            }
            await driver.close();
          }
        });
      });
      n += 15000;
    }, n);
  });
}

async function addAuthor() {
  let n = 5000;
  teachers.forEach((teacher) => {
    setTimeout(() => {
      fs.readFile(teacher, function (err, data) {
        parser.parseString(data, async function (err, result) {
          var authorName = result.dblpperson.person[0].author[0]._; // getName
          var authorId = result.dblpperson.person[0].author[0]["$"].pid; // getId
          var coAuthors = result.dblpperson.coauthors[0].co;

          for(let i = 0; i < coAuthors.length; i++) {
            var coAuthorName = coAuthors[i].na[0]._;
            var coAuthorId = coAuthors[i].na[0].$.pid;
            const driver = neo4j.driver(
              "bolt://localhost:7687",
              neo4j.auth.basic("neo4j", "admin")
            );
            const session = driver.session();
            try {
              if (hocalar_list.includes(coAuthorName)) {
                const res = await session.run(
                  "MERGE (a:author {id: $authorId, name: $authorName}) MERGE (b:author {id: $coAuthorId, name: $coAuthorName}) MERGE (a)-[:ORTAK_ÇALIŞIR]->(b)",
                  {
                    authorId: authorId,
                    authorName: authorName,
                    coAuthorId: coAuthorId,
                    coAuthorName: coAuthorName,
                  }
                );
              }
            } finally {
              await session.close();
            }
            await driver.close();
          }
        });
      });
      n += 15000;
    }, n);
  });
}

// addProject();
addAuthor();

async function deneme() {
  fs.readFile("data/abdurrahman_gün.xml", function (err, data) {
    parser.parseString(data, async function (err, result) {
      console.log(result.dblpperson.coauthors[0].co[0].na);
    });
  });
}
// deneme();
