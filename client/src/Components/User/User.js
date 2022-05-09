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

  function handleSubmit() {
    if (
      info.authorName === "" ||
      info.publishingName === "" ||
      info.publishingYear === ""
    ) {
      setErrorText("Lütfen tüm alanları doldurunuz.");
    } else {
      // TODO post request for database searching
      setErrorText("");
      fetch("http://localhost:3000/admin_add", {
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
          console.log(data);
        });
    }
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
                  query: "MATCH (n)-[r]->(m) RETURN *"
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
    </div>
  );
}

export default User;
