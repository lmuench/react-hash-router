import React, { Component } from 'react';

class LightLink extends Component {

  handleClick = () => {

    if (window.location.hash !== '#' + this.props.path) {
      window.location.hash = '#' + this.props.path;
    } else {
      window.location.hash = '#\u200b' + this.props.path;
    }

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
