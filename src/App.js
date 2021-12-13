import WorkbookView from "./tableau/WorkbookView.js";
import TopNav from "./layout/TopNav.js";

import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <TopNav />
        <WorkbookView />
      </main>
    </div>
  );
}

export default App;
