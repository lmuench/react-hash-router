import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Router extends Component {
  constructor() {
    super();
    this.state = {};
    window.addEventListener('hashchange', this.handleNavigation, false);
  }

  componentDidMount() {
    this.handleNavigation();
  }

  handleNavigation = () => {
    let browserPath = this.getBrowserPath();
    browserPath = browserPath.split('/').slice(1).filter(segment => segment);  // TODO wrap in function?

    let route = this.getRouteForPath(this.props.routes, browserPath);
    if (!route) route = this.props.defaultRoute;
    if (!route) return;

    const props = this.getPropsForRoute(route, browserPath);

    this.setState({
      component: React.createElement(route.component, props)
    });
  }

  getBrowserPath = () => {
    return window.location.hash;
  }

  getRouteForPath = (routes, browserPath) => {

    const route = routes.find(route => {
      const routePath = route.path.split('/').slice(1);  // TODO wrap in function?

      if (browserPath.length < routePath.length) return false;  // TODO return null instead?

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
      <div>{this.state.component}</div>
    );
  }
}

export default Router;
