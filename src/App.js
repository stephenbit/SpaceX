import React, { useState, useEffect } from "react";
import Header from "./Header";
import rocket from "./assets/img/launch-home@3x.png";
import "./stylesheet.scss";

function App() {
  const [launches, setLaunches] = useState([]);
  const [sortByAscending, setsortByAscending] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((data) => setRockets(data));
  }, []);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);


  // const yearsList = launches.map((launch) => {
  //   const distinctYears = new Date(launch.date_utc)
  //     .getUTCFullYear()
  //     .filter((value, index, self) => self.indexOf(value) === index);

  //   return (
  //     <select>
  //       <option value={distinctYears}>{distinctYears}</option>
  //     </select>
  //   );
  // });

  const filteredLaunches =
    selectedYear !== null
      ? launches.filter(
          (launch) =>
            new Date(launch.date_utc).getUTCFullYear() === selectedYear
        )
      : launches;

  const launchesList = filteredLaunches.map((filteredLaunch, index) => {
    const numbering = index + 1;
    const formattedDate = new Date(filteredLaunch.date_utc).getUTCDate();
    const formattedMonth = new Date(filteredLaunch.date_utc).getUTCMonth() + 1;
    const formattedYear = new Date(filteredLaunch.date_utc).getUTCFullYear();
    const fullDate = `${formattedDate}/${formattedMonth}/${formattedYear}`;
    const rocketName = rockets.find(
      (rocket) => rocket.id === filteredLaunch.rocket
    ).name;

    return (
      <li key={filteredLaunch.id}>
        <div className="grid-container">
          <div className="numbering">#{numbering}</div>
          <div className="launch-name"> {filteredLaunch.name}</div>
          <div className="date">{fullDate}</div>
          <div className="rocket-name">{rocketName}</div>
        </div>
      </li>
    );
  });
  console.log();
  return (
    <div
      className={
        launches.length < 2 || launches === undefined ? "blocked" : "App"
      }
    >
      <Header
        sortByAscending={sortByAscending}
        setsortByAscending={setsortByAscending}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <div className="main-content">
        <div className="left-container">
          <img src={rocket} alt="rocket taking off"></img>
        </div>
        <div className="right-container">
          <ol>{sortByAscending ? launchesList : launchesList.reverse()}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
