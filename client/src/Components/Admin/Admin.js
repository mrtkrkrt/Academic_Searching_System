import React from "react";
import { useState } from "react";
import "./style.css";

// (ArastirmaciID, ArastirmaciAdi,
//     ArastirmaciSoyadi, YayinAdi, YayinYili, YayinYeri (Konferans, çalıştay, dergi
//     adı vb.), YayinTurBilgisi vb.)

function Admin() {
  const [errorText, setErrorText] = useState("");
  const [authorInfo, setAuthorInfo] = useState({
    authorId: "",
    authorName: "",
    publishingName: "",
    publishingYear: "",
    publishingPlace: "",
    publishingKind: "",
  });

  function registerDatabase() {
    if (
      authorInfo.authorId === "" ||
      authorInfo.authorName === "" ||
      authorInfo.publishingName === "" ||
      authorInfo.publishingYear === "" ||
      authorInfo.publishingPlace === "" ||
      authorInfo.publishingKind === ""
    ) {
      setErrorText("Lütfen tüm alanları doldurunuz.");
    } else {
    //   setErrorText("");
    //   fetch("http://localhost:8080/api/author", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(authorInfo),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    console.log(authorInfo);
    }
  }

  return (
    <div>
      <div className="header">
        <a href="#default" className="logo">
          ADMİN SAYFASI
        </a>
        <div className="header-right">
          <a href="admin">Form Temizle</a>
          <a className="active" href="/">
            Çıkış Yap
          </a>
        </div>
      </div>
      <div id="loginform">
        <h2 id="headerTitle">ARAŞTIRMACI EKLE</h2>
        <div className="row">
          <label>Araştırmacı ID</label>
          <input
            type="text"
            placeholder="Araştırmacı Id Giriniz"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "authorId":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Araştırmacı Ad Soyad</label>
          <input
            type="text"
            placeholder="Araştırmacı Ad Soyad Giriniz"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "authorName":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Adı</label>
          <input
            type="text"
            placeholder="Yayın Adı Giriniz"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "publishingName":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Yılı</label>
          <input
            type="number"
            placeholder="Yayın Yılı Giriniz"
            min="0"
            max="2022"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "publishingYear":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Yeri</label>
          <input
            type="text"
            placeholder="Yayın Yeri Giriniz"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "publishingPlace":e.target.value}))}
          />
        </div>
        <div className="row">
          <label>Yayın Tür Bilgisi</label>
          <input
            type="text"
            placeholder="Yayın Tür Bilgisi Giriniz"
            onChange={(e) => setAuthorInfo(prevState => ({...prevState, "publishingKind":e.target.value}))}
          />
        </div>
        <div className="row">
          <text>{errorText} </text>
        </div>
        <div id="button" className="row">
          <button onClick={ registerDatabase }>EKLE</button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Admin;
