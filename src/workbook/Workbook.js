import Datasource from "../datasource/Datasource.js";
import Worksheet from "../worksheet/Worksheet.js";
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
    };
  }

  componentDidMount() {
    this._init();
  }

  _init() {
    let fileName = this.props.workbook.file.name;
    let workbookXML = this.props.workbook.xmlDoc;
    let dashboards = this._prepareDashboards(workbookXML);
    let datasources = this._prepareDatasources(workbookXML);
    let datasourceIndex = this._prepareDatasourceIndex(datasources);
    let worksheets = this._prepareWorksheets(workbookXML);
    this._checkFieldsUsage(worksheets, datasourceIndex);
    this.setState({
      fileName: fileName,
      workbookXML: workbookXML,
      dashboards: dashboards,
      datasources: datasources,
      worksheets: worksheets,
    });
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

    for (let datasource of datasourceElements) {
      let datasourceXML = new Datasource(datasource);
      datasources.push(datasourceXML);
    }
    return datasources;
  }

  _prepareDatasourceIndex(datasources) {
    // TODO
    // Replace for a WeakRef "dict"
    let datasourceIndexes = {};
    for (let datasourceIndex in datasources) {
      let datasource = datasources[datasourceIndex];

      datasourceIndexes[datasource.name] = datasource;
    }
    return datasourceIndexes;
  }

  _prepareWorksheets(workbookXML) {
    let worksheets = [];

    let worksheetElements = workbookXML.getElementsByTagName("worksheets")[0].children;
    if (!worksheetElements) return [];

    for (let worksheetXML of worksheetElements) {
      let worksheet = new Worksheet(worksheetXML);
      worksheets.push(worksheet);
    }
    return worksheets;
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

    if (datasources) {
      return datasources.map((datasource, datasourceIndex) => {
        return <p key={datasourceIndex}>{datasource.name}</p>;
      });
    } else {
      return "";
    }
  }
}
