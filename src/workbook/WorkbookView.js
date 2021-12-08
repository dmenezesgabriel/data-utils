import React from "react";
import JSZip from "jszip";

import FileUpload from "../file/FileUpload.js";
import Workbook from "./Workbook.js";

export default class WorkbookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null, xmlDoc: null };
    this.add = this.add.bind(this);
    this.loaded = this.loaded.bind(this);
  }

  add(fileObject) {
    this.setState({ file: fileObject }, () => this.loaded());
  }

  loaded() {
    const reader = new FileReader();
    const parser = new DOMParser();
    const zip = new JSZip();

    const file = this.state.file;
    let type = file.name.split(".").slice(-1)[0];
    console.log(type);

    if (type === "twbx") {
      console.log(type);
    }
    reader.onload = (event) => {
      let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
      this.setState({ xmlDoc: xmlDoc });
    };
    reader.readAsText(file, "UTF-8");
  }

  render() {
    const file = this.state.file;
    const xmlDoc = this.state.xmlDoc;
    if (file && xmlDoc) {
      return (
        <div>
          <FileUpload addEvent={this.add} loadedEvent={this.loaded} />
          <Workbook workbook={this.state} />
        </div>
      );
    } else {
      return (
        <div>
          <FileUpload addEvent={this.add} />
        </div>
      );
    }
  }
}
