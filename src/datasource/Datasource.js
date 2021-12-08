import Connection from "../connection/Connection.js";
import Column from "../column/Column.js";
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
  }

  componentDidMount() {
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

  render() {
    const datasourceName = this.state.name;
    const connections = this.state.connections;
    const columns = this.state.columns;

    if (datasourceName) {
      return (
        <div>
          <p>{this.state.name}</p>
          <p>{this.state.version}</p>
          <p>{this.state.caption}</p>
          {connections.map((connection, connectionIndex) => {
            return <Connection key={connectionIndex} connection={connection} />;
          })}
          {columns.map((column, columnIndex) => {
            return <Column key={columnIndex} column={column} />;
          })}
        </div>
      );
    } else {
      return "";
    }
  }
}
