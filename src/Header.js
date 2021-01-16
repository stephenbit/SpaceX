import React from "react";
import logo from "./assets/img/spacex-logo.png";
import "./stylesheet.scss";

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
      <img src={logo} alt="space x logo" />
      <div>LAUNCHES</div>
      <button onClick={() => setsortByAscending((value) => !value)}>
        {sortByAscending ? "Sort By Descending" : "Sort By Ascending"}
      </button>
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
      <button
        onClick={function reload() {
          setLaunches(null);
          setRockets(null);
        }}
      >
        Reload
      </button>
    </header>
  );
}

export default Header;
