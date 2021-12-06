import logo from "./logo.svg";
import WorkbookParser from "./workbook/WorkbookParser.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <WorkbookParser />
      </header>
    </div>
  );
}

export default App;
