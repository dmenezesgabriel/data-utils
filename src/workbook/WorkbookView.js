import React from "react";

import FileUpload from "../file/FileUpload.js";
import Workbook from "./Workbook.js";

export default class WorkbookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: undefined, xmlDoc: undefined };
    this.add = this.add.bind(this);
    this.loaded = this.loaded.bind(this);
  }

  add(fileObject) {
    this.setState({ file: fileObject });
    this.file = fileObject;
  }

  loaded() {
    const reader = new FileReader();
    const parser = new DOMParser();

    reader.onload = (event) => {
      let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
      this.setState({ xmlDoc: xmlDoc });
    };
    reader.readAsText(this.file, "UTF-8");
  }

  render() {
    const file = this.state.file;
    const xmlDoc = this.state.xmlDoc;

    let workbookComponent;

    if (typeof file !== "undefined" && typeof xmlDoc !== "undefined") {
      workbookComponent = <Workbook workbook={this.state} />;
    } else {
      workbookComponent = "Upload a Workbook";
    }
    return (
      <div>
        <FileUpload addEvent={this.add} loadedEvent={this.loaded} />
        {workbookComponent}
      </div>
    );
  }
}
