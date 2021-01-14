import React from "react";
import logo from "./assets/img/spacex-logo.png";
import "./stylesheet.scss";

function Header({ sortByAscending, setsortByAscending }) {
  return (
    <header>
      <img src={logo} alt="space x logo" />
      <div>LAUNCHES</div>
      <button onClick={() => setsortByAscending((value) => !value)}>
        {sortByAscending ? "Sort By Descending" : "Sort By Ascending"}
      </button>
    </header>
  );
}

export default Header;
