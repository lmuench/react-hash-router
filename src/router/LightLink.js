import React, { Component } from 'react';

class LightLink extends Component {

  handleClick = () => {
    window.location.hash = '#' + this.props.path;
  }

  render() {
    return (
      <div onClick={this.handleClick} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default LightLink;
