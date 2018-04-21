import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Router extends Component {
  constructor() {
    super();
    window.addEventListener('hashchange', this.handleNavigation, false);
  }

  componentDidMount() {
    this.handleNavigation();
  }

  handleNavigation = () => {
    const path = this.getBrowserPath();
    const component = this.getComponentForPath(path);
    if (!component) return;

    ReactDOM.render(
      React.createElement(component, null),
      document.getElementById('component')
    );
  }

  getBrowserPath = () => {
    return window.location.hash.substring(1);
  }

  getComponentForPath = path => {
    if (!path) path = '/';
    const route = this.props.routes.find(route => route.path === path);
    return route ? route.component : this.props.default;
  }

  render() {
    return (
      <div id="component" />
    );
  }
}

export default Router;
