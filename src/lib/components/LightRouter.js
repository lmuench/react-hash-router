import React, { Component } from 'react';
import LightUrl from './LightUrl';

class LightRouter extends Component {
  constructor() {
    super();
    this.state = {};
    window.addEventListener('hashchange', this.handleNavigation, false);
  }

  componentDidMount() {
    this.handleNavigation();
  }

  handleNavigation = () => {
    const segments = LightUrl.getSegments();

    let route = this.getRouteForPath(this.props.routes, segments);
    if (!route) route = this.props.defaultRoute;
    if (!route) return;

    if (route.effects) {
      for (const effect of route.effects) {
        effect();
      }
    }

    const propsFromPath = this.getPropsForRouteFromPath(route, segments);

    const queries = LightUrl.getQueries();
    const propsFromQueries = this.getPropsForRouteFromQueries(route, queries);

    const props = {
      ...route.props,
      ...propsFromPath,
      ...propsFromQueries
    }

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
      const routePathSegments = LightUrl.extractSegments(route.path);

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
  getPropsForRouteFromPath = (route, segments) => {
    const props = {};

    if (route.path) {

      const routePathSegments = LightUrl.extractSegments(route.path);

      for (const element of route.propsFromPath) {
        const position = routePathSegments.indexOf(element.segment);

        if (position < 0) return;
        
        let segment = segments[position];
        
        if (element.plugs) {
          for (const plug of element.plugs) {
            segment = plug(segment);
          }
        }

        if (element.effects) {
          for (const effect of element.effects) {
            effect(segment);
          }
        }
        
        props[element.prop] = segment;
      }

    }

    return props;
  }

  getPropsForRouteFromQueries = (route, queries = []) => {
    const props = {};

    for (const query of queries) {

      for (const propFromQuery of route.propsFromQueries) {
        
        if (query[0] === propFromQuery.query) {
          
          let prop = '';

          if (propFromQuery.convert) {

            if (query[1] === 'true') {
              prop = true;
            } else if (query[1] === 'false') {
              prop = false;
            } else if (isNaN(query[1])) {
              prop = query[1];
            } else {
              prop = +query[1];  // converts string into a number
            }

          } else {
            
            prop = query[1];

          }

          if (propFromQuery.plugs) {
            for (const plug of propFromQuery.plugs) {
              prop = plug(prop);
            }
          }

          if (propFromQuery.effects) {
            for (const effect of propFromQuery.effects) {
              effect(prop);
            }
          }

          props[propFromQuery.prop] = prop;

        }
        
      }

    }
    
    return props;
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.state.component}
      </div>
    );
  }
}

export default LightRouter;
