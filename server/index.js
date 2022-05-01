const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/oneNode", (req, res) => {
    // TODO write post request for cypher queries you can draw only one node
})

app.post("/add", (req, res) => {
    // TODO write post request for cypher queries you can add node to database
})

app.post("/search", (req, res) => {
    // TODO write post request for cypher queries you can search node in database
})

app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
