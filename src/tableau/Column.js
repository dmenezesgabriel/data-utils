import React from "react";
import TableData from "../layout/TableData.js";

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
      usedIn: null,
    };
    this._setUpdate = this._setUpdate.bind(this);
    this._prepareCalculation = this._prepareCalculation.bind(this);
    this._addUsedIn = this._addUsedIn.bind(this);
  }

  componentDidMount() {
    this._setUpdate();
  }

  componentDidUpdate(prevProps) {
    let condition = prevProps.column !== this.props.column || prevProps.worksheetDatasources !== this.props.worksheetDatasources;
    if (condition) {
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
      usedIn: this._addUsedIn(),
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

  _addUsedIn() {
    let usedIn = [];
    const worksheetDatasources = this.props.worksheetDatasources;
    for (let worksheet of worksheetDatasources) {
      const datasourceInfo = worksheet.datasourceDeps;
      if (datasourceInfo) {
        let used = datasourceInfo.columns.includes(`[${this.state.name}]`);
        if (used) {
          usedIn.push(worksheet.name);
        }
      }
    }
    return usedIn;
  }

  render() {
    const name = this.state.name;
    if (name) {
      return (
        <tr>
          <TableData>{this.state.name}</TableData>
          <TableData>{this.state.caption}</TableData>
          <TableData>{this.state.datatype}</TableData>
          <TableData>{this.state.role}</TableData>
          <TableData>{this.state.type}</TableData>
          <TableData>{this.state.calculation}</TableData>
          <TableData>{this.state.description}</TableData>
          <TableData>{this.state.usedIn.join(", ")}</TableData>
        </tr>
      );
    } else {
      return null;
    }
  }
}
