import React, { useState, useEffect } from "react";
import Header from "./Header";
import rocketImg from "./assets/img/launch-home@3x.png";
import "./stylesheet.scss";

function parseLaunch(launch) {
  const date = new Date(launch.date_utc);
  return {
    name: launch.name,
    date: date.toLocaleDateString("en-GB"),
    year: date.getUTCFullYear().toString(),
    rocket: launch.rocket,
    id: launch.id,
  };
}

function App() {
  const [rockets, setRockets] = useState(null);
  const [launches, setLaunches] = useState(null);
  const [sortByAscending, setsortByAscending] = useState(true);
  const [selectedYear, setSelectedYear] = useState("Filter by Year");
  const [years, setYears] = useState(["Filter by Year"]);

  useEffect(() => {
    if (rockets == null) {
      fetch("https://api.spacexdata.com/v4/rockets/")
        .then((res) => res.json())
        // TODO: to check if API is undefined before
        // TODO: put the map here
        .then(setRockets);
    }
  }, [rockets]);

  useEffect(() => {
    if (launches == null) {
      fetch("https://api.spacexdata.com/v4/launches/")
        .then((res) => res.json())
        // TODO: to check if API is undefined before
        .then((launches) => setLaunches(launches.map(parseLaunch)));
    }
  }, [launches]);

  console.log(launches);

  useEffect(() => {
    if (launches === null) {
      return;
    }
    const yearsList = launches.map((launch) => launch.year);
    const newYearsList = [...new Set(yearsList)].sort();
    newYearsList.unshift("Filter by Year");
    setYears(newYearsList);
  }, [launches]);

  function showFilteredLaunches() {
    if (launches === null) {
      return;
    }
    let filteredLaunches =
      selectedYear !== "Filter by Year"
        ? launches.filter((launch) => launch.year === selectedYear)
        : [...launches];
    if (!sortByAscending) {
      filteredLaunches.reverse();
    }
    return filteredLaunches.map(oneLaunch);
  }

  function oneLaunch(launch, index) {
    const oneRocket = rockets.find((rocket) => rocket.id === launch.rocket);
    const rocketName = oneRocket ? oneRocket.name : "";
    const numbering = index + 1;
    return (
      <li key={launch.id}>
        <div className="grid-container">
          <div className="numbering">#{numbering}</div>
          <div className="launch-name"> {launch.name}</div>
          <div className="date">{launch.date}</div>
          <div className="rocket-name">{rocketName}</div>
        </div>
      </li>
    );
  }

  return (
    <div className="App">
      <Header
        sortByAscending={sortByAscending}
        setsortByAscending={setsortByAscending}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        yearsList={years}
        setLaunches={setLaunches}
        setRockets={setRockets}
      />
      <div className="main-content">
        <div className="left-container">
          <img
            className="main-image"
            src={rocketImg}
            alt="rocket taking off"
          ></img>
        </div>
        <div className="right-container">
          <ol>{showFilteredLaunches()}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
