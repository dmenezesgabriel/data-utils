import Connection from "../connection/Connection.js";
import Column from "../column/Column.js";

export default class Datasource {
  constructor(datasourceXML, fileName = null) {
    this._fileName = fileName;
    this._datasourceXML = datasourceXML;
    this._name = this._datasourceXML.getAttribute("name");
    this._version = this._datasourceXML.getAttribute("version");
    this._caption = this._datasourceXML.getAttribute("caption");
    this._connections = this._prepareConnections(this._datasourceXML);
    this._columns = this._prepareColumns(this._datasourceXML);
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
}
