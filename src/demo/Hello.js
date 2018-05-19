import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        Hello {this.props.first} {this.props.last}
      </div>
    );
  }
}

export default Hello;
