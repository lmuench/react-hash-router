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
    let browserPath = this.getBrowserPath();
    browserPath = browserPath.split('/').slice(1).filter(segment => segment);

    let route = this.getRouteForPath(this.props.routes, browserPath);
    if (!route) route = this.props.defaultRoute;
    if (!route) return;

    console.log(browserPath);
    console.log(route.path);
    

    const props = this.getPropsForRoute(route, browserPath);

    ReactDOM.render(
      React.createElement(route.component, props),
      document.getElementById('component')
    );
  }

  getBrowserPath = () => {
    return window.location.hash;
  }

  getRouteForPath = (routes, browserPath) => {

    const route = routes.find(route => {
      const routePath = route.path.split('/').slice(1);

      if (browserPath.length < routePath.length) return false;

      let match = true;
      let propIndex = 0;

      for (let i = 0; i < routePath.length; ++i) {
        if (routePath[i] !== browserPath[i]) {
          if (routePath[i] !== route.propsFromPath[propIndex].segment) {
            match = false;
            break;
          }
          propIndex += 1;
        }
      }
      return match;
    });

    return route;
  }

  getPropsForRoute = (route, browserPath) => {
    const props = route.props ? route.props : {};

    if (route.path) {

      const routePath = route.path.split('/').slice(1);

      for (let element of route.propsFromPath) {
        const position = routePath.indexOf(element.segment);

        if (position < 0) return;

        props[element.prop] = browserPath[position];
      }

    }

    return props;
  }

  render() {
    return (
      <div id="component" />
    );
  }
}

export default Router;
