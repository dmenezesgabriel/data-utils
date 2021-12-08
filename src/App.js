import logo from "./logo.svg";
import WorkbookView from "./workbook/WorkbookView.js";
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <main>
        <WorkbookView />
      </main>
    </div>
  );
}

export default App;
