import React from "react";
import TextInput from "../layout/TextInput.js";
import Label from "../layout/Label.js";

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
          <div className="bg-white border rounded px-8 pt-6 pb-8 mb-4">
            <h4 className="my-2">Connection</h4>
            <form action="">
              <Label htmlFor="dbName">DB Name: </Label>
              <TextInput type="text" name="dbName" id="" defaultValue={this.state.dbName} />
            </form>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}
