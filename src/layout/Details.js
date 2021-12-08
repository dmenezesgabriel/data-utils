import React from "react";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  handleClick(event) {
    this.setState((state, props) => ({ opened: !state.opened }));
  }

  render() {
    return (
      <details className="bg-white mb-3 p-3 rounded shadow-md" onClick={(event) => this.handleClick(event)}>
        <summary>
          <h3>{this.props.title}</h3>
          <span className="icon">👇</span>
        </summary>

        {this.props.children}
      </details>
    );
  }
}
