import Connection from "../connection/Connection.js";
import Column from "../column/Column.js";
import Details from "../layout/Details.js";
import TextInput from "../layout/TextInput.js";
import Label from "../layout/Label.js";

import React from "react";

export default class Datasource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasourceXML: null,
      name: null,
      version: null,
      caption: null,
      connections: null,
      columns: null,
    };
    this._setUpdate = this._setUpdate.bind(this);
    this._prepareConnections = this._prepareConnections.bind(this);
    this._prepareColumns = this._prepareColumns.bind(this);
    this._filterWorksheets = this._filterWorksheets.bind(this);
  }

  componentDidMount() {
    this._setUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datasource !== this.props.datasource) {
      this._setUpdate();
    }
  }

  _setUpdate() {
    this.setState((state, props) => ({
      datasourceXML: this.props.datasource,
      name: this.props.datasource.getAttribute("name"),
      version: this.props.datasource.getAttribute("version"),
      caption: this.props.datasource.getAttribute("caption"),
      connections: this._prepareConnections(this.props.datasource),
      columns: this._prepareColumns(this.props.datasource),
    }));
  }

  _prepareConnections(datasourceXML) {
    let connections = [];
    let connectionsElements = datasourceXML.getElementsByTagName("connection");
    for (let index = 0; index < connectionsElements.length; index++) {
      connections.push(connectionsElements[index]);
    }
    return connections;
  }

  _prepareColumns(datasourceXML) {
    let columns = [];
    let columnsElements = datasourceXML.getElementsByTagName("column");
    for (let index = 0; index < columnsElements.length; index++) {
      columns.push(columnsElements[index]);
    }
    return columns;
  }

  _filterWorksheets() {
    const worksheetDatasources = this.props.worksheetDatasources;
    let relatedWorksheets = [];
    worksheetDatasources.map((worksheet, worksheetIndex) => {
      let thisDatasource = worksheet.datasourceDeps.filter((element) => {
        return element.name === this.state.name;
      });
      relatedWorksheets.push({ name: worksheet.worksheetName, datasourceDeps: thisDatasource[0] });
    });
    return relatedWorksheets;
  }

  render() {
    const datasourceName = this.state.name;
    const connections = this.state.connections;
    const columns = this.state.columns;
    const worksheetDatasources = this._filterWorksheets();

    if (datasourceName) {
      return (
        <Details title={datasourceName}>
          <form className="bg-white border rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <div>
                <Label htmlFor="name">Name</Label>
                <TextInput name="name" id="" defaultValue={this.state.name} />
              </div>
              <div>
                <Label htmlFor="version">Version</Label>
                <TextInput type="text" name="version" id="" defaultValue={this.state.version} />
              </div>
              <div>
                <Label htmlFor="caption">Caption</Label>
                <TextInput type="text" name="caption" id="" defaultValue={this.state.caption} />
              </div>
            </div>
          </form>
          {connections.map((connection, connectionIndex) => {
            return <Connection key={connectionIndex} connection={connection} />;
          })}
          <div className="bg-white border rounded px-8 pt-6 pb-8 mb-4">
            <h4 className="my-2">Columns</h4>
            <div className="table-wrapper overflow-y-auto overflow-x-hidden">
              <table className="table-fixed">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Caption</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Datatype</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Role</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Type</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Calculation</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Description</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Used In</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {columns.map((column, columnIndex) => {
                    return <Column key={columnIndex} column={column} worksheetDatasources={worksheetDatasources} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Details>
      );
    } else {
      return null;
    }
  }
}
