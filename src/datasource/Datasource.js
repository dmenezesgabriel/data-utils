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
      // Connection
      let connection = new Connection(connectionsElements[index]);
      connections.push(connection);
    }
    return connections;
  }

  _prepareColumns(datasourceXML) {
    let columns = [];
    let columnsElements = datasourceXML.getElementsByTagName("column");
    for (let index = 0; index < columnsElements.length; index++) {
      // column
      let column = new Column(columnsElements[index]);
      columns.push(column);
    }
    return columns;
  }

  get name() {
    return this._name;
  }

  get connections() {
    return this._connections;
  }

  get columns() {
    return this._columns;
  }

  render() {
    const datasourceName = this.state.name;

    if (datasourceName) {
      return <div>{datasourceName}</div>;
    } else {
      return "";
    }
  }
}
