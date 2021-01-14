import React, { useState, useEffect } from "react";
import LaunchesCom from "./LaunchesCom";
import Header from "./Header";
import rocket from "./assets/img/launch-home@3x.png";
import "./stylesheet.scss";

function App() {
  const [launches, setLaunches] = useState([]);
  const [sortByAscending, setsortByAscending] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);

  const filteredLaunches =
    selectedYear !== null
      ? launches.filter(
          (launch) =>
            new Date(launch.date_utc).getUTCFullYear() === selectedYear
        )
      : launches;

  return (
    <div
      className={
        launches.length < 2 || launches === undefined ? "blocked" : "App"
      }
    >
      <Header
        sortByAscending={sortByAscending}
        setsortByAscending={setsortByAscending}
      />
      <div className="main-content">
        <div className="left-container">
          <img src={rocket} alt="rocket taking off"></img>
        </div>
        <div className="right-container">
          <LaunchesCom
            filteredLaunches={filteredLaunches}
            sortByAscending={sortByAscending}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
