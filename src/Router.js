import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import utils from './RouterUtils';

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
    let browserPath = utils.getBrowserPath();
    browserPath = utils.extractSegments(browserPath);

    let route = this.getRouteForPath(this.props.routes, browserPath);
    if (!route) route = this.props.defaultRoute;
    if (!route) return;

    const props = this.getPropsForRoute(route, browserPath);

    this.setState({
      component: React.createElement(route.component, props)
    });
  }

  getRouteForPath = (routes, browserPath) => {

    const route = routes.find(route => {
      const routePath = utils.extractSegments(route.path);

      if (browserPath.length < routePath.length) return null;

      let match = true;
      let propIndex = 0;

      for (let i = 0; i < routePath.length; ++i) {
        if (routePath[i] !== browserPath[i]) {
          if (
            !browserPath[i] ||
            !route.propsFromPath[propIndex] ||
            routePath[i] !== route.propsFromPath[propIndex].segment
          ) {
            match = false;
            break;
          }
          propIndex += 1;
        }
      }
      return match;
    });

    return route ? route : null;
  }

  getPropsForRoute = (route, browserPath) => {
    const props = route.props ? route.props : {};

    if (route.path) {

      const routePath = utils.extractSegments(route.path);

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
