import React from "react";
import logo from "./assets/img/spacex-logo.png";
import "./stylesheet.scss";

function Header() {
  return (
    <header>
      <img src={logo} alt="space x logo" />
      <div>LAUNCHES</div>
    </header>
  );
}

export default Header;
