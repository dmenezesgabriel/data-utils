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

          if (this.props.loadedEvent) {
            this.props.loadedEvent();
          }
        }
      });
    }
  };

  render() {
    return (
      <div>
        <input type="file" onChange={(event) => this.handleChange(event)} />
      </div>
    );
  }
}
