import React, { useState, useEffect } from "react";
import "./stylesheet.scss";

function LaunchesCom({ launches }) {
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

    return (
      <li key={launch.id}>
        <div class="grid-container">
          <div class="numbering">#{numbering}</div>
          <div class="launch-name"> {launch.name}</div>
          <div class="date">{fullDate}</div>
          <div class="rocket-name">{launch.rocket}</div>
        </div>
      </li>
    );
  });

  return <ol>{launchesList}</ol>;
}
export default LaunchesCom;
