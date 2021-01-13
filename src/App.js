import React, { useState, useEffect } from "react";
import logo from "./assets/img/spacex-logo.png";
import LaunchesCom from "./LaunchesCom";
import "./stylesheet.scss";

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <LaunchesCom launches={launches} />
    </div>
  );
}

export default App;
