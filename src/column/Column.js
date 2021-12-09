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
    this._setUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.column !== this.props.column) {
      this._setUpdate();
    }
  }

  _setUpdate() {
    this.setState((state, props) => ({
      columnXML: this.props.column,
      name: this.props.column.getAttribute("name"),
      caption: this.props.column.getAttribute("caption"),
      datatype: this.props.column.getAttribute("datatype"),
      role: this.props.column.getAttribute("role"),
      type: this.props.column.getAttribute("type"),
      calculation: this._prepareCalculation(this.props.column),
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
        <tr>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.name}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.caption}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.datatype}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.role}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.type}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.calculation}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.description}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{this.state.usedIn}</td>
        </tr>
      );
    } else {
      return null;
    }
  }
}
