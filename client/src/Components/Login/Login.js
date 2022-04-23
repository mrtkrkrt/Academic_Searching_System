import React from "react";
import { useState } from "react";
import "./login.css";

function Login() {
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === "admin" && password === "admin") {
      setErrorText("");
      window.location.href = "/admin";
    } else if (username === "user" && password === "user") {
      setErrorText("");
      window.location.href = "/user";
    } else {
      setErrorText("Invalid username or password");
    }
  };

  return (
    <div id="loginform">
      <h2 id="headerTitle">GİRİŞ</h2>
      <div className="row">
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          placeholder="Kullanıcı Adını Giriniz"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Şifre</label>
        <input
          type="password"
          placeholder="Şifrenizi Girin"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="row">
        <text>{errorText}</text>
      </div>
      <div id="button" className="row">
        <button onClick={handleSubmit}>KULLANICI GİRİŞ</button>
        <br />
        <button onClick={handleSubmit}>ADMİN GİRİŞ</button>
        <br />
      </div>
    </div>
  );
}

export default Login;
