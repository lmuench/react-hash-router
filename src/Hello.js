import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        hello {this.props.name} {this.props.id}
      </div>
    );
  }
}

export default Hello;
