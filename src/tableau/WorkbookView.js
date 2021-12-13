import React from "react";
import JSZip from "jszip";

import FileUpload from "../file/FileUpload.js";
import MainHeading from "../layout/MainHeading.js";

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
    const parser = new DOMParser();
    const file = this.state.file;

    let type = file.name.split(".").slice(-1)[0];
    if (type === "twbx") {
      const zip = new JSZip();
      zip.loadAsync(file).then((zip) => {
        const twbName = Object.keys(zip.files).find((file) => file.includes(".twb"));
        const twb = zip.files[twbName];
        twb.async("string").then((content) => {
          if (!content) return (this.errorMessage = "No twb file found");
          let xmlDoc = parser.parseFromString(content, "text/xml");
          this.setState({ xmlDoc: xmlDoc });
        });
      });
    } else if (type === "twb") {
      const reader = new FileReader();
      reader.onload = (event) => {
        let xmlDoc = parser.parseFromString(event.target.result, "text/xml");
        this.setState({ xmlDoc: xmlDoc });
      };
      reader.readAsText(file, "UTF-8");
    }
  }

  render() {
    const file = this.state.file;
    const xmlDoc = this.state.xmlDoc;
    if (file && xmlDoc) {
      return (
        <div className="container mx-auto px-4">
          <MainHeading>Workbook</MainHeading>
          <FileUpload addEvent={this.add} loadedEvent={this.loaded} />
          <Workbook workbook={this.state} />
        </div>
      );
    } else {
      return (
        <div className="container mx-auto px-4">
          <MainHeading>Workbook</MainHeading>
          <FileUpload addEvent={this.add} />
        </div>
      );
    }
  }
}
