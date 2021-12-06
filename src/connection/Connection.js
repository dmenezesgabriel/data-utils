export default class Connection {
  constructor(connectionXML) {
    this._connectionXML = connectionXML;
    this._dbName = connectionXML.getAttribute("dbname");
    this._server = connectionXML.getAttribute("server");
    this._username = connectionXML.getAttribute("username");
    this._authentication = connectionXML.getAttribute("authentication");
    this._class = connectionXML.getAttribute("class");
    this._schema = connectionXML.getAttribute("schema");
    this._service = connectionXML.getAttribute("service");
    this._port = connectionXML.getAttribute("port");
  }

  get dbName() {
    return this._dbName;
  }

  set dbName(dbName) {
    this._dbName = dbName;
    this._connectionXML.setAttribute("dbname", dbName);
  }

  get server() {
    return this._server;
  }

  set server(server) {
    this._server = server;
    this._connectionXML.setAttribute("server", server);
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
    this._connectionXML.setAttribute("username", username);
  }

  get authentication() {
    return this._authentication;
  }

  set authentication(authentication) {
    this._authentication = authentication;
    this._connectionXML.setAttribute("authentication", authentication);
  }

  get className() {
    return this._class;
  }

  set className(className) {
    this._class = className;
    this._connectionXML.setAttribute("class", className);
  }

  get schema() {
    return this._schema;
  }

  set schema(schema) {
    this._schema = schema;
    this._connectionXML.setAttribute("schema", schema);
  }

  get service() {
    return this._class;
  }

  set service(service) {
    this._service = service;
    this._connectionXML.setAttribute("service", service);
  }

  get port() {
    return this._class;
  }

  set port(port) {
    this._port = port;
    this._connectionXML.setAttribute("port", port);
  }
}
