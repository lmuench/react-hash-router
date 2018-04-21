import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Router extends Component {
  componentDidMount() {
    ReactDOM.render(
      React.createElement(this.props.routes[0].component, null),
      document.getElementById('router')
    );
  }

  render() {
    return (
      <div id="router" />
    );
  }
}

export default Router;
