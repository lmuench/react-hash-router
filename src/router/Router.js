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

  /**
   * @param {array} routes - array of routes
   * @param {array} segments - path segments
   * @return {Object} route
   * @example route
   * {
   *   path: '/hello/:first/:last',
   *   component: Hello,
   *   guards: [fooGuard, barGuard],
   *   props: [{ foo: 'bar' }],
   *   propsFromPath: [{
   *     prop: 'first',
   *     segment: ':first',
   *     plugs: [fooPlug, barPlug]
   *   }, {
   *     prop: 'last',
   *     segment: ':last'
   *   }]
   * }
   */
  getRouteForPath = (routes, segments) => {

    const route = routes.find(route => {
      const routePathSegments = utils.extractSegments(route.path);

      if (route.guards) {
        for (const guard of route.guards) {
          if (guard() !== true) return false;
        }
      }

      if (segments.length < routePathSegments.length) return false;

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

  /**
   * @param {Object} route - route
   * @param {array} segments - path segments
   * @return {array} props
   * @example props
   * [
   *   { foo: 'bar' },
   *   { first: 'peter'},
   *   { last:, 'piper' }
   * ]
   */
  getPropsForRoute = (route, segments) => {
    const props = route.props ? route.props : {};

    if (route.path) {

      const routePathSegments = utils.extractSegments(route.path);

      for (const element of route.propsFromPath) {
        const position = routePathSegments.indexOf(element.segment);

        if (position < 0) return;

        let segment = segments[position];

        if (element.plugs) {
          for (const plug of element.plugs) {
            segment = plug(segment);
          }
        }
        
        props[element.prop] = segment;
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
