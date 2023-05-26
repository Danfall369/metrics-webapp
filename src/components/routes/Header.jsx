import React from 'react';
import '../../style/header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="headerTitle">DFall Store</h1>
      <div className="infoCont">
        <input placeholder="Search Here" />
        <button type="button">Gear</button>
      </div>
    </header>
  );
}

export default Header;
