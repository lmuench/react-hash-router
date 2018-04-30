import React, { Component } from 'react';
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
    const segments = utils.getSegments();

    let route = this.getRouteForPath(this.props.routes, segments);
    if (!route) route = this.props.defaultRoute;
    if (!route) return;

    const props = this.getPropsForRoute(route, segments);

    this.setState({
      component: React.createElement(route.component, props)
    });
  }

  getRouteForPath = (routes, segments) => {

    const route = routes.find(route => {
      const routePathSegments = utils.extractSegments(route.path);

      if (segments.length < routePathSegments.length) return null;

      let match = true;
      let propIndex = 0;

      for (let i = 0; i < routePathSegments.length; ++i) {
        if (routePathSegments[i] !== segments[i]) {
          if (
            !segments[i] ||
            !route.propsFromPath[propIndex] ||
            routePathSegments[i] !== route.propsFromPath[propIndex].segment
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

  getPropsForRoute = (route, segments) => {
    const props = route.props ? route.props : {};

    if (route.path) {

      const routePathSegments = utils.extractSegments(route.path);

      for (let element of route.propsFromPath) {
        const position = routePathSegments.indexOf(element.segment);

        if (position < 0) return;

        props[element.prop] = segments[position];
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
