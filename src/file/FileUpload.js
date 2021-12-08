import React from "react";

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: undefined };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      this.setState({ file: file }, () => {
        if (this.props.addEvent) {
          this.props.addEvent(this.state.file);
        }
      });
    }
  };

  render() {
    return (
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-900 block" htmlFor="twb"></label>
        <input
          className="block cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg"
          type="file"
          name="twb"
          onChange={(event) => this.handleChange(event)}
        />
      </div>
    );
  }
}
