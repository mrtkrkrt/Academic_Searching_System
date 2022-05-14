/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function User() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    authorName: "",
    publishingName: "",
    publishingYear: "",
  });
  const [errorText, setErrorText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleSubmit() {
    setErrorText("");
    fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.result.records);
        if (data.result.records[0]._fields) {
          setSearchResult(data.result.records);
        }
      });
  }

  function navigateAuthorGraph() {
    let query =
      "match(a1:author{name:'" +
      info.authorName +
      "'})-[r:ORTAK_ÇALIŞIR]->(a2) match(a1)-[r2:YAZDI]->(p) match(p)<-[r3:YAYINLADI]-(pub) return a1,r,a2,r2,r3,p,pub";
    navigate("/user/graph", {
      state: {
        query: query,
      },
    });
  }

  return (
    <div>
      <div className="header">
        <a href="/user" className="logo">
          USER SAYFASI
        </a>
        <div className="header-right">
          <a href="/user">Arama Yap</a>
          <a
            onClick={() => {
              navigate("/user/graph", {
                state: {
                  query: "MATCH (n)-[r]->(m) RETURN *",
                },
              });
            }}
          >
            Graf Görüntüle
          </a>
          <a className="active" href="/">
            Çıkış Yap
          </a>
        </div>
      </div>

      <div id="loginform">
        <h2 id="headerTitle">ARAMA FORMU</h2>
        <div className="row">
          <label>Yazar Adı</label>
          <input
            type="text"
            placeholder="Yazar Adını Giriniz"
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                authorName: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <button
            className="redButton"
            id="button"
            onClick={() => navigateAuthorGraph()}
          >
            {" "}
            Yazar Grafı
          </button>
        </div>
        <div className="row">
          <label>Yayın Adı</label>
          <input
            type="text"
            placeholder="Yayın Adını Girin"
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                publishingName: e.target.value,
              }))
            }
          />
        </div>
        <div className="row">
          <label>Yayın Yılı</label>
          <input
            type="text"
            placeholder="Yayın Yılı Girin"
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                publishingYear: e.target.value,
              }))
            }
          />
        </div>
        <div className="row">
          <text>{errorText}</text>
        </div>
        <div id="button" className="row">
          <button onClick={handleSubmit}>ARA</button>
          <br />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          margin: "10px",
        }}
      >
        {searchResult.map((item) => {
          let pngUrl =
            item._fields[0].properties.title === "inproceedings"
              ? "https://cdn-icons-png.flaticon.com/512/1643/1643231.png"
              : "https://cdn-icons-png.flaticon.com/512/337/337118.png";
          return (
            <div>
              <div className="product">
                <img src={pngUrl} />
                <div>
                  <span style={{ 
                    fontSize: "20px",
                    color: "red"
                  }}>Title:</span>
                  {item._fields[0].properties.title}
                </div>
                <div className="price">
                  {item._fields[0].properties.year[0]}
                </div>
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default User;
