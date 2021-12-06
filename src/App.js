import logo from "./logo.svg";
import WorkbookParser from "./workbook/WorkbookParser.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <main>
        <WorkbookParser />
      </main>
    </div>
  );
}

export default App;
