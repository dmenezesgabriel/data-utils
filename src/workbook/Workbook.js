import Datasource from "../datasource/Datasource.js";
import Worksheet from "../worksheet/Worksheet.js";
import Details from "../layout/Details.js";
import { Database, FileText } from "react-feather";

import React from "react";

export default class Workbook extends React.Component {
  /**
  Class for writing tableau workbook files
   */
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      workbookXML: null,
      dashboards: null,
      datasources: null,
      worksheets: null,
      worksheetsDatasources: [],
    };
    this._setUpdate = this._setUpdate.bind(this);
    this._prepareDashboards = this._prepareDashboards.bind(this);
    this._prepareDatasources = this._prepareDatasources.bind(this);
    this._prepareWorksheets = this._prepareWorksheets.bind(this);
    this._addWorksheetDeps = this._addWorksheetDeps.bind(this);
  }

  componentDidMount() {
    this._setUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.workbook !== this.props.workbook) {
      this._setUpdate();
    }
  }

  _setUpdate() {
    this.setState((state, props) => ({
      fileName: this.props.workbook.file.name,
      workbookXML: this.props.workbook.xmlDoc,
      dashboards: this._prepareDashboards(this.props.workbook.xmlDoc),
      datasources: this._prepareDatasources(this.props.workbook.xmlDoc),
      worksheets: this._prepareWorksheets(this.props.workbook.xmlDoc),
    }));
  }

  _prepareDashboards(workbookXML) {
    let dashboards = [];

    let dashboardElements = workbookXML.getElementsByTagName("dashboards")[0].children;
    if (!dashboardElements) return [];

    for (let dashboard of dashboardElements) {
      let dashboardName = dashboard.getAttribute("name");
      dashboards.push(dashboardName);
    }
    return dashboards;
  }

  _prepareDatasources(workbookXML) {
    let datasources = [];

    let datasourceElements = workbookXML.getElementsByTagName("datasources")[0].children;
    if (!datasourceElements) return [];

    for (let datasourceXML of datasourceElements) {
      datasources.push(datasourceXML);
    }
    return datasources;
  }

  _prepareWorksheets(workbookXML) {
    let worksheets = [];

    let worksheetElements = workbookXML.getElementsByTagName("worksheets")[0].children;
    if (!worksheetElements) return [];

    for (let worksheetXML of worksheetElements) {
      worksheets.push(worksheetXML);
    }
    return worksheets;
  }

  _addWorksheetDeps(worksheetName, datasourceDeps) {
    this.setState(
      { worksheetsDatasources: this.state.worksheetsDatasources.concat({ worksheetName: worksheetName, datasourceDeps: datasourceDeps }) },
      () => {
        console.log(this.state.worksheetsDatasources);
      }
    );
  }

  _checkFieldsUsage(worksheets, datasourcesIndex) {
    for (let worksheet of worksheets) {
      for (let datasourceDepIndex in worksheet.datasourceDependencies) {
        let datasourceDep = worksheet.datasourceDependencies[datasourceDepIndex];
        let datasource = datasourcesIndex[datasourceDep.name];
        for (let columnIndex in datasource.columns) {
          let column = datasource.columns[columnIndex];
          if (datasourceDep.columns.includes(column.name)) {
            column.addUsedIn(worksheet.name);
          }
        }
      }
    }
  }

  save() {
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(this._workbookXML);
    let downloadAnchor = document.createElement("a");

    downloadAnchor.setAttribute("href", "data:text/twb;charset=utf-8," + encodeURIComponent(xmlStr));
    downloadAnchor.setAttribute("download", this._fileName);

    downloadAnchor.style.display = "none";
    document.body.appendChild(downloadAnchor);

    downloadAnchor.click();

    document.body.removeChild(downloadAnchor);
  }

  render() {
    const datasources = this.state.datasources;
    const worksheets = this.state.worksheets;

    if (datasources && worksheets) {
      return (
        <section>
          <div className="mb-4 border-b-2">
            <h2 className="text-2xl mb-4">
              <span>{this.state.fileName}</span>
            </h2>
          </div>
          <Details title="Datasources" icon={<Database />}>
            {datasources.map((datasource, datasourceIndex) => {
              return <Datasource key={datasourceIndex} datasource={datasource} />;
            })}
          </Details>
          <Details title="Worksheets" icon={<FileText />}>
            {worksheets.map((worksheet, worksheetIndex) => {
              return <Worksheet key={worksheetIndex} worksheet={worksheet} addDatasourceDeps={this._addWorksheetDeps} />;
            })}
          </Details>
        </section>
      );
    } else {
      return null;
    }
  }
}
