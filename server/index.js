const express = require("express");
const app = express();
const cors = require("cors");
const neo4j = require("neo4j-driver");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/admin_add", async (req, res) => {
  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "admin")
  );
  let findAuthor = false;
  let authorInfo = req.body;
  const session = driver.session();
  try {
    const res = await session.run("MATCH (p:author {id: $id}) RETURN p", {
      id: authorInfo.authorId,
    });
    if (res.records.length > 0) {
      findAuthor = true;
      const result = await session.run(
        "MERGE (a:author {id: $authorId}) MERGE (b:proje {title: $projectName, type: $projectType, year: $projectYear}) MERGE(c:publisher {name: $publisherName}) MERGE (a)-[:YAZAN]->(b) MERGE (c)-[:YAYINLADI]-(b)",
        {
          authorId: authorInfo.authorId,
          projectName: authorInfo.publishingName,
          projectType: authorInfo.publishingKind,
          projectYear: authorInfo.publishingYear,
          publisherName: authorInfo.publishingPlace,
        }
      );
    }
  } finally {
    await session.close();
  }
  await driver.close();
  return res.json({ status: "success", bool: findAuthor });
});

app.post("/search", (req, res) => {
  // TODO write post request for cypher queries you can search node in database
  
});

app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
