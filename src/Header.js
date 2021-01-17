import React from "react";
import logo from "./assets/img/spacex-logo.png";
import "./stylesheet.scss";
import refreshImg from "./assets/icon/refresh@3x.png";
import sortImg from "./assets/icon/sort@3x.png";
import selectImg from "./assets/icon/select@3x.png";

function Header({
  sortByAscending,
  setsortByAscending,
  selectedYear,
  setSelectedYear,
  yearsList,
  setLaunches,
  setRockets,
}) {
  return (
    <header>
      <img className="logo" src={logo} alt="space x logo" />
      <div className="launches-text">LAUNCHES</div>{" "}
      <div className="reload">
        <button
          onClick={function reload() {
            setLaunches(null);
            setRockets(null);
          }}
        >
          Reload
          <img className="header-icons" src={refreshImg} />
        </button>
      </div>
      <div className="sort">
        <button onClick={() => setsortByAscending((value) => !value)}>
          {sortByAscending ? "Sort Descending" : "Sort Ascending"}
          <img className="header-icons" src={sortImg} />
        </button>
      </div>
      <div className="year">
        <select
          id="lang"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          {yearsList.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </header>
  );
}

export default Header;
