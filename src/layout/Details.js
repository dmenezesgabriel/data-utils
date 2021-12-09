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
    const opened = this.state.opened;
    return (
      <details className="bg-white mb-3 p-3 rounded border" onClick={(event) => this.handleClick(event)}>
        <summary>
          <span className="mx-2">{this.props.icon}</span>
          <h3>{this.props.title}</h3>
          <span className={`icon ${opened ? "transform rotate-180" : ""}`}>👇</span>
        </summary>
        <div className="mt-4">{this.props.children}</div>
      </details>
    );
  }
}
