import React from "react";

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnXML: null,
      name: null,
      caption: null,
      datatype: null,
      role: null,
      type: null,
      calculation: null,
      description: null,
      usedIn: [],
    };
  }

  componentDidMount() {
    this.setState((state, props) => ({
      columnXML: this.props.column,
      name: this.props.column.getAttribute("name"),
      caption: this.props.column.getAttribute("caption"),
      datatype: this.props.column.getAttribute("datatype"),
      role: this.props.column.getAttribute("role"),
      type: this.props.column.getAttribute("type"),
      calculation: this.props.column.getAttribute("calculation"),
      description: this.props.column.getAttribute("description"),
      usedIn: [],
    }));
  }

  _prepareCalculation(columnXML) {
    let formula = null;
    let calculationElement = columnXML.getElementsByTagName("calculation")[0];
    if (calculationElement) {
      formula = calculationElement.getAttribute("formula");
    }
    return formula;
  }

  addUsedIn(worksheetName) {
    this._usedIn.push(worksheetName);
  }

  render() {
    const name = this.state.name;
    if (name) {
      return (
        <div>
          <p>Column: {this.state.name}</p>
        </div>
      );
    } else {
      return "";
    }
  }
}
