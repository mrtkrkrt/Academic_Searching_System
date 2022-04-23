import React from "react";

function User() {
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
    </div>
  );
}

export default User;
