export default class Worksheet {
  constructor(worksheetXML) {
    this._worksheetXML = worksheetXML;
    this._name = this._worksheetXML.getAttribute("name");
    this._datasourceDependencies = this._prepareDatasourceDependencies(this._worksheetXML);
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

  get name() {
    return this._name;
  }

  get datasourceDependencies() {
    return this._datasourceDependencies;
  }
}
