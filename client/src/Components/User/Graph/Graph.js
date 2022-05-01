import React from "react";
import { useState } from "react";
import "./graph.css";
import NeoGraph from "./NeoGraph";

const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "admin";

function Graph() {
  const [cypher, setCypher] = useState("MATCH (n)-[r]->(m) RETURN *");

  function handleCallback(data) {
    setCypher(data);
  }
  return (
    <div>
      <div className="header">
        <a href="#default" className="logo">
          GRAPH SAYFASI
        </a>
        <div className="header-right">
          <a href="/user">Arama Yap</a>
          <a href="/user/graph">Graf Görüntüle</a>
          <a className="active" href="/">
            Çıkış Yap
          </a>
        </div>
      </div>
      <div id="loginform">
        <NeoGraph
          width={1000}
          height={800}
          containerId={"id1"}
          neo4jUri={NEO4J_URI}
          neo4jUser={NEO4J_USER}
          neo4jPassword={NEO4J_PASSWORD}
          backgroundColor={"transparent"}
          initial_cypher={cypher}
          parentCallback= {handleCallback}
        />
      </div>
    </div>
  );
}

export default Graph;
