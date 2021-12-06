import React from "react";

import FileUpload from "../file/FileUpload.js";
import Workbook from "./Workbook.js";

export default class WorkbookParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: undefined };
    this.file = undefined;
    this.workbook = undefined;
    this.add = this.add.bind(this);
    this.loaded = this.loaded.bind(this);
    this._setWorkbook = this._setWorkbook.bind(this);
  }

  _setWorkbook(fileName, xmlDoc) {
    this.workbook = new Workbook(fileName, xmlDoc);
    console.log(this.workbook);
  }

  add(fileObject) {
    this.setState({ file: fileObject });
    this.file = fileObject;
  }

  loaded() {
    console.log("File loaded");
    const reader = new FileReader();
    const parser = new DOMParser();

    reader.onload = (event) => {
      let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
      this._setWorkbook(this.file.name, xmlDoc);
    };
    reader.readAsText(this.file, "UTF-8");
  }

  render() {
    return (
      <div>
        <FileUpload addEvent={this.add} loadedEvent={this.loaded} />
      </div>
    );
  }
}
