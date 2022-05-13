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

app.post("/search",async (req, res) => {
  let query = "", result;
  if (req.body.authorName) {
    query += "MATCH (a:author {name: '" + req.body.authorName + "'})";
    if (req.body.publishingName && req.body.publishingYear) {
      query +=
        " MATCH (a)-[:YAZDI]->(p:proje {title: ['" +
        req.body.publishingName +
        "'], year: ['" +
        req.body.publishingYear +
        "']}) RETURN p";
    } else {
      if (req.body.publishingName) {
        query +=
          " MATCH (a)-[:YAZDI]->(p:proje {title: ['" +
          req.body.publishingName +
          "']}) RETURN p";
      } else if (req.body.publishingYear) {
        query +=
          " MATCH (a)-[:YAZDI]->(p:proje {year: ['" +
          req.body.publishingYear +
          "']}) RETURN p";
      }
    }
    if (!req.body.publishingName && !req.body.publishingYear) {
      query += "-[:YAZDI]->(p:proje) RETURN p";
    }
  } else {
    if (req.body.publishingName && req.body.publishingYear) {
      query +=
        "MATCH (p:proje {title: ['" +
        req.body.publishingName +
        "'], year: ['" +
        req.body.publishingYear +
        "']}) RETURN p";
    } else {
      if (req.body.publishingName) {
        query +=
          "MATCH (p:proje {title: ['" + req.body.publishingName + "']}) RETURN p";
      } else if (req.body.publishingYear) {
        query +=
          "MATCH (p:proje {year: ['" + req.body.publishingYear + "']}) RETURN p";
      }
    }
  }
  console.log(query);
  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "admin")
  );
  const session = driver.session();
  try {
    const res = await session.run(query);
    result = res;
  } finally {
    await session.close();
  }
  await driver.close();
  return res.json({ status: "success", result: result, query: query });
});

app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
