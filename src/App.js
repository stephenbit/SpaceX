import React, { useState, useEffect } from "react";
import LaunchesCom from "./LaunchesCom";
import Header from "./Header";
import rocket from "./assets/img/launch-home@3x.png";
import "./stylesheet.scss";

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);

  return (
    <div
      className={
        launches.length < 2 || launches == undefined ? "blocked" : "App"
      }
    >
      <Header />
      <div className="main-content">
        <div className="left-container">
          <img src={rocket} alt="rocket taking off"></img>
        </div>
        <div className="right-container">
          <LaunchesCom launches={launches} />
        </div>
      </div>
    </div>
  );
}

export default App;
