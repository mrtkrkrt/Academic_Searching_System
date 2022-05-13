import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./graph.css";
import NeoGraph from "./NeoGraph";

const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "admin";

function Graph() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { query } = state;
  const [cypher, setCypher] = useState("");

  useEffect(() => {
    setCypher(query);
  }, [query]);

  function handleCallback(data) {
    setCypher(data);
  }
  function handleRefresh() {
    console.log("Yönlendi");
    navigate("/user/graph", {
      state: {
        query: "MATCH (n)-[r]->(m) RETURN *",
      },
    });
  }
  return (
    <div>
      <div className="header">
        <a onClick={handleRefresh} className="logo">
          GRAPH SAYFASI
        </a>
        <div className="header-right">
          <a href="/user">Arama Yap</a>
          <a onClick={handleRefresh}>Graf Görüntüle</a>
          <a className="active" href="/">
            Çıkış Yap
          </a>
        </div>
      </div>
      <div id="graphForm">
        <NeoGraph
          width={1000}
          height={800}
          containerId={"id1"}
          neo4jUri={NEO4J_URI}
          neo4jUser={NEO4J_USER}
          neo4jPassword={NEO4J_PASSWORD}
          backgroundColor={"transparent"}
          initial_cypher={cypher}
          parentCallback={handleCallback}
        />
      </div>
    </div>
  );
}

export default Graph;
