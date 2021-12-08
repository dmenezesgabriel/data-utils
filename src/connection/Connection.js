import React from "react";

export default class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionXML: null,
      dbName: null,
      server: null,
      username: null,
      authentication: null,
      className: null,
      schema: null,
      service: null,
      port: null,
    };
  }

  componentDidMount() {
    this.setState((state, props) => ({
      connectionXML: this.props.connection,
      dbName: this.props.connection.getAttribute("dbname"),
      server: this.props.connection.getAttribute("server"),
      username: this.props.connection.getAttribute("username"),
      authentication: this.props.connection.getAttribute("authentication"),
      className: this.props.connection.getAttribute("class"),
      schema: this.props.connection.getAttribute("schema"),
      service: this.props.connection.getAttribute("service"),
      port: this.props.connection.getAttribute("port"),
    }));
  }

  render() {
    const connectionClass = this.state.className;
    if (connectionClass) {
      return (
        <div>
          <p>dbname: {this.state.dbName}</p>
        </div>
      );
    } else {
      return "";
    }
  }
}
