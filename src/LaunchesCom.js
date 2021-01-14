import React, { useState, useEffect } from "react";
import "./stylesheet.scss";

function LaunchesCom({ launches, sortByAscending }) {
  const [rockets, setRockets] = useState([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((data) => setRockets(data));
  }, []);

  const launchesList = launches.map((launch, index) => {
    const numbering = index + 1;
    const formattedDate = new Date(launch.date_utc).getUTCDate();
    const formattedMonth = new Date(launch.date_utc).getUTCMonth() + 1;
    const formattedYear = new Date(launch.date_utc).getUTCFullYear();
    const fullDate = `${formattedDate}/${formattedMonth}/${formattedYear}`;
    const rocketName = rockets.find((rocket) => rocket.id === launch.rocket)
      .name;
    return (
      <li key={launch.id}>
        <div className="grid-container">
          <div className="numbering">#{numbering}</div>
          <div className="launch-name"> {launch.name}</div>
          <div className="date">{fullDate}</div>
          <div className="rocket-name">{rocketName}</div>
        </div>
      </li>
    );
  });

  return <ol>{sortByAscending ? launchesList : launchesList.reverse()}</ol>;
}

export default LaunchesCom;
