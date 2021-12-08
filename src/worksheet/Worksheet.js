import React from "react";

export default class Worksheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worksheetXML: null,
      name: null,
      datasourceDependencies: null,
    };
  }

  componentDidMount() {
    this.setState((state, props) => ({
      datasourceXML: this.props.worksheet,
      name: this.props.worksheet.getAttribute("name"),
      datasourceDependencies: this._prepareDatasourceDependencies(this.props.worksheet),
    }));
  }

  _prepareDatasourceDependencies(worksheetXML) {
    let datasourceDependencies = [];
    let dependencies = worksheetXML.getElementsByTagName("datasource-dependencies");
    for (let index = 0; index < dependencies.length; index++) {
      let dependency = dependencies[index];
      let datasource = { name: "", columns: [] };
      datasource.name = dependency.getAttribute("datasource");
      let columns = dependency.getElementsByTagName("column");
      for (let index = 0; index < columns.length; index++) {
        let column = columns[index];
        let columnName = column.getAttribute("name");
        datasource.columns.push(columnName);
      }
      datasourceDependencies.push(datasource);
    }
    return datasourceDependencies;
  }

  render() {
    const worksheetName = this.state.name;
    if (worksheetName) {
      return (
        <div>
          <h5>
            Worksheet - <span contentEditable="true">{this.state.name}</span>
          </h5>
        </div>
      );
    } else {
      return "";
    }
  }
}
