import React, { Component } from 'react';

class Link extends Component {

  handleClick = () => {
    window.location.hash = '#' + this.props.path;
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Link;
