import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

/*
`MATCH (n)-[r]->(m) WHERE ID(n) = ${params.nodes[0]} RETURN *
*/

const NeoGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    initial_cypher
  } = props;

  const visRef = useRef();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
        Troll: {
          caption: "user_key",
          size: "pagerank",
          community: "community",
        },
      },
      relationships: {
        RETWEETS: {
          caption: false,
          thickness: "count",
        },
      },
      initial_cypher:
        initial_cypher,
    };
    const vis = new Neovis(config);
    vis.render();

    vis.registerOnEvent("completed", (event) => {
      vis["_network"].on("click", (params) => {
        if(params.nodes.length > 0) {
          props.parentCallback("MATCH (n)-[r]->(m) WHERE ID(n) = " + params.nodes[0] + " RETURN n, r, m");
        }else{
          props.parentCallback("MATCH (n)-[r]->(m) RETURN *");
        }
        console.log(params.nodes[0], "Clicked");
      });
    });

  }, [neo4jUri, neo4jUser, neo4jPassword, initial_cypher, props]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

NeoGraph.defaultProps = {
  width: 1000,
  height: 1000,
  backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  initial_cypher: PropTypes.string.isRequired,
};

export default NeoGraph;