import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        Hello {this.props.first} {this.props.last}
        <br />
        {this.props.message}
        <br/ >
        {this.props.printTimestamp === true && `${new Date(Number(new Date()))}`}
      </div>
    );
  }
}

export default Hello;
