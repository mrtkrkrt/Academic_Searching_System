const neo4j = require("neo4j-driver");
let fs = require("fs");
let xml2js = require("xml2js");
let parser = new xml2js.Parser();

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
  "Kerem Kucuk",
  "Nevcihan Duru",
];

let teachers = [
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

async function addProject() {
  let n = 0;
  teachers.forEach((teacher) => {
    setTimeout(() => {
      fs.readFile(teacher, function (err, data) {
        parser.parseString(data, async function (err, result) {
          for (let i = 0; i < result.dblpperson.r.length; i++) {
            let currentProject;
            let currentProjectType;
            let currentProjectPublisher;
            if (result.dblpperson.r[i].inproceedings) {
              currentProject = result.dblpperson.r[i].inproceedings[0];
              currentProjectType = "inproceedings";
              currentProjectPublisher = "IEEE Access";
            } else {
              currentProject = result.dblpperson.r[i].article[0];
              currentProjectType = "article";
              currentProjectPublisher = currentProject.journal[0];
            }
            let currentProjectId = currentProject["$"].key;
            let currentProjecTitle = currentProject.title;
            let currentProjectYear = currentProject.year;
            let currentProjectEe = currentProject.ee;
            let currentProjectUrl = currentProject.url;
            let authors = currentProject.author; // getCoAuthors
            const driver = neo4j.driver(
              "bolt://localhost:7687",
              neo4j.auth.basic("neo4j", "admin")
            );

            for (let j = 0; j < authors.length; j++) {
              let authorName = authors[j]._;
              let authorId = authors[j].$.pid;
              const session = driver.session();
              try {
                if (hocalar_list.includes(authorName)) {
                  const res = await session.run(
                    "MERGE (p:proje {id: $id, title: $title, year: $year, type: $type}) MERGE (a:author {id: $authorId, name: $authorName}) MERGE (a)-[:YAZDI]->(p)",
                    {
                      id: currentProjectId,
                      title: currentProjecTitle,
                      year: currentProjectYear,
                      type: currentProjectType,
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
    }, n);
    n += 2000;
  });
}

async function addAuthor() {
  let n = 0;
  teachers.forEach((teacher) => {
    setTimeout(() => {
      fs.readFile(teacher, function (err, data) {
        parser.parseString(data, async function (err, result) {
          let authorName = result.dblpperson.person[0].author[0]._; // getName
          let authorId = result.dblpperson.person[0].author[0]["$"].pid; // getId
          let coAuthors = result.dblpperson.coauthors[0].co;

          for (let i = 0; i < coAuthors.length; i++) {
            let coAuthorName = coAuthors[i].na[0]._;
            let coAuthorId = coAuthors[i].na[0].$.pid;
            const driver = neo4j.driver(
              "bolt://localhost:7687",
              neo4j.auth.basic("neo4j", "admin")
            );
            const session = driver.session();
            try {
              if (hocalar_list.includes(coAuthorName)) {
                const res = await session.run(
                  "MERGE (a:author {id: $authorId, name: $authorName}) MERGE (b:author {id: $coAuthorId, name: $coAuthorName}) MERGE (a)-[:ORTAK_ÇALIŞIR]->(b) MERGE (b)-[:ORTAK_ÇALIŞIR]->(a)",
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
    }, n);
    n += 2000;
  });
}

async function addPublisher() {
  let n = 0;
  teachers.forEach((teacher) => {
    setTimeout(() => {
      fs.readFile(teacher, function (err, data) {
        parser.parseString(data, async function (err, result) {
          for (let i = 0; i < result.dblpperson.r.length; i++) {
            let currentProject;
            let currentProjectPublisher = "IEEE Access";
            if (result.dblpperson.r[i].inproceedings) {
              currentProject = result.dblpperson.r[i].inproceedings[0];
            } else {
              currentProject = result.dblpperson.r[i].article[0];
              currentProjectPublisher = currentProject.journal[0];
            }
            let currentProjectId = currentProject["$"].key;
            const driver = neo4j.driver(
              "bolt://localhost:7687",
              neo4j.auth.basic("neo4j", "admin")
            );
            const session = driver.session();
            try {
              const res = await session.run(
                "MERGE (p:publisher {name: $publisher}) MERGE(prj:proje {id: $id}) MERGE (p)-[:YAYINLADI]->(prj)",
                {
                  publisher: currentProjectPublisher,
                  id: currentProjectId,
                }
              );
            } finally {
              await session.close();
            }
            await driver.close();
          }
        });
      });
    }, n);
    n += 2000;
  });
}

// addProject();
// addAuthor();
// addPublisher();