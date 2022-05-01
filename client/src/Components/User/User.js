import React from "react";
import { useState } from "react";
import "./style.css"

// araştırmacı adı-soyadı, yayın adı, yayın yılına göre arama yapılır.

function User() {
  const [info, setInfo] = useState({
    authorName: "",
    publishingName: "",
    publishingYear: "",
  });
  const [errorText, setErrorText] = useState("")

  function handleSubmit() {
    if (info.authorName === "" || info.publishingName === "" || info.publishingYear === "") {
      setErrorText("Lütfen tüm alanları doldurunuz.")
    } else {
      // TODO post request for database searching
      setErrorText("")
      console.log(info)
    }
  }

  return (
    <div>
      <div className="header">
        <a href="#default" className="logo">
          USER SAYFASI
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
        <h2 id="headerTitle">ARAMA FORMU</h2>
        <div className="row">
          <label>Yazar Adı</label>
          <input
            type="text"
            placeholder="Yazar Adını Giriniz"
            onChange={(e) => setInfo(prevState => ({...prevState, "authorName":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Adı</label>
          <input
            type="password"
            placeholder="Yayın Adını Girin"
            onChange={(e) => setInfo(prevState => ({...prevState, "publishingName":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Yılı</label>
          <input
            type="password"
            placeholder="Yayın Yılı Girin"
            onChange={(e) => setInfo(prevState => ({...prevState, "publishingYear":e.target.value}))}
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
