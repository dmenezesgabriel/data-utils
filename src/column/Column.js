export default class Column {
  constructor(columnXML) {
    this._columnXML = columnXML;
    this._name = columnXML.getAttribute("name");
    this._caption = columnXML.getAttribute("caption");
    this._datatype = columnXML.getAttribute("datatype");
    this._role = columnXML.getAttribute("role");
    this._type = columnXML.getAttribute("type");
    this._calculation = this._prepareCalculation(this._columnXML);
    this._description = columnXML.getAttribute("description");
    this._usedIn = [];
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

  get name() {
    return this._name;
  }

  set name(name) {
    return (this._name = name);
  }

  get caption() {
    return this._caption;
  }

  set caption(caption) {
    return (this._caption = caption);
  }
  get datatype() {
    return this._datatype;
  }

  set datatype(datatype) {
    return (this._datatype = datatype);
  }

  get role() {
    return this._role;
  }

  set role(role) {
    return (this._role = role);
  }

  get calculation() {
    return this._calculation;
  }

  set calculation(calculation) {
    return (this._calculation = calculation);
  }

  get description() {
    return this._description;
  }

  set description(description) {
    return (this._description = description);
  }

  get usedIn() {
    return this._usedIn;
  }

  set usedIn(usedIn) {
    return (this._usedIn = usedIn);
  }
}
