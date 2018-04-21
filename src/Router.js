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
    const route = this.getRouteForPath(path);
    if (!route) return;
    const props = this.getPropsForRoute(route);
    
    ReactDOM.render(
      React.createElement(route.component, props),
      document.getElementById('component')
    );
  }

  getBrowserPath = () => {
    return window.location.hash.slice(1);
  }

  getRouteForPath = path => {
    if (!path) path = '/';
    const route = this.props.routes.find(route => path.startsWith(route.path));

    return route ? route : this.props.defaultRoute;
  }

  getPropsForRoute = route => {
    if (route.propFromPath) {
      const path = this.getBrowserPath();
      const pathTail = path.slice(route.path.length + 1);
      
      if (pathTail.length > 0) {
        route.propFromPath[Object.keys(route.propFromPath)[0]] = pathTail;
      }
    }

    return {
      ...route.props,
      ...route.propFromPath
    }
  }

  render() {
    return (
      <div id="component" />
    );
  }
}

export default Router;
