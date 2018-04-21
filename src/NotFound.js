import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div>
        not found {this.props.msg}
      </div>
    );
  }
}

export default NotFound;
