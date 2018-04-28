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

  extractSegmentsAndQueries = path => {
    const pathAndQuery = path.split('?');
    const segments = pathAndQuery[0].split('/').slice(1);
    let queries = pathAndQuery[1] ? pathAndQuery[1].split('&') : [];
    queries = queries.map(querie => querie.split('='));
    return { segments, queries };
  }

  handleNavigation = () => {
    let browserPath = this.getBrowserPath();
    browserPath = this.extractSegmentsAndQueries(browserPath).segments;

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
      const routePath = this.extractSegmentsAndQueries(route.path).segments;

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

      const routePath = this.extractSegmentsAndQueries(route.path).segments;

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
