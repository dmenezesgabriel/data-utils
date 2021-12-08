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
    this._setUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connection !== this.props.connection) {
      this._setUpdate();
    }
  }

  _setUpdate() {
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
    const dbName = this.state.dbName;

    if (connectionClass && dbName) {
      return (
        <section>
          <h4>Connection</h4>
          <form action="">
            <label htmlFor="dbName">DB Name: </label>
            <input type="text" name="dbName" id="" defaultValue={this.state.dbName} />
          </form>
        </section>
      );
    } else {
      return null;
    }
  }
}
