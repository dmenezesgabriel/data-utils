import React from "react";

import FileUpload from "../file/FileUpload.js";
import Workbook from "./Workbook.js";

export default class WorkbookParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: undefined };
    this.file = undefined;
    this.add = this.add.bind(this);
    this.loaded = this.loaded.bind(this);
    this._parseFile = this._parseFile.bind(this);
  }

  _parseFile(fileName, xmlDoc) {
    let workbook = new Workbook(fileName, xmlDoc);
    console.log(workbook);

    for (let dashboardIndex in workbook.dashboards) {
      let dashboard = workbook.dashboards[dashboardIndex];
      console.log(dashboard);
    }

    for (let worksheetIndex in workbook.worksheets) {
      let worksheet = workbook.worksheets[worksheetIndex];
      console.log(worksheet);
    }

    for (let datasourceIndex in workbook.datasources) {
      let datasource = workbook.datasources[datasourceIndex];
      console.log(datasource);
      for (let connectionIndex in datasource.connections) {
        let connection = datasource.connections[connectionIndex];
        console.log(connection);
        connection.dbName = "sample-testing";
      }
    }
  }

  add(fileObject) {
    this.setState({ file: fileObject });
    this.file = fileObject;
  }

  loaded() {
    console.log("File loaded");
    const reader = new FileReader();
    const parser = new DOMParser();
    let xmlDoc = reader.readAsText(this.file, "UTF-8");
    reader.onload = (event) => {
      let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
      this._parseFile(this.file.name, xmlDoc);
    };
  }

  render() {
    return (
      <div>
        <FileUpload addEvent={this.add} loadedEvent={this.loaded} />
      </div>
    );
  }
}
