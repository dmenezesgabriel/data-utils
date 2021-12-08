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

  render() {
    const datasourceName = this.state.name;
    const connections = this.state.connections;
    const columns = this.state.columns;

    if (datasourceName) {
      return (
        <details>
          <summary>
            <h3>Datasource - {datasourceName}</h3>
            <span class="icon" role="img" aria-label="collapse">
              👇
            </span>
          </summary>
          <form action="">
            <div>
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="" defaultValue={this.state.name} />
              </div>
              <div>
                <label htmlFor="version">Version: </label>
                <input type="text" name="version" id="" defaultValue={this.state.version} />
              </div>
              <div>
                <label htmlFor="caption">Caption: </label>
                <input type="text" name="caption" id="" defaultValue={this.state.caption} />
              </div>
            </div>
          </form>
          {connections.map((connection, connectionIndex) => {
            return <Connection key={connectionIndex} connection={connection} />;
          })}
          <h4>Columns</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Caption</th>
                <th>Datatype</th>
                <th>Role</th>
                <th>Type</th>
                <th>Calculation</th>
                <th>Description</th>
                <th>Used In</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((column, columnIndex) => {
                return <Column key={columnIndex} column={column} />;
              })}
            </tbody>
          </table>
        </details>
      );
    } else {
      return null;
    }
  }
}
