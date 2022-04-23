import React from 'react'
import "./../style.css"

function Graph() {
  // TODO visualize graph on screen and add clickable events on nodes
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
    </div>
  )
}

export default Graph