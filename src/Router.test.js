import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router.js';
const should = require('should');

describe('getRouteForPath()', () => {
  const routes = [
    {
      path: '/hello/:first/:last',
      component: {},
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
  ]

  const defaultRoute = {
    component: {}
  }

  const browserPath = (
    '#/hello/peter/piper'.split('/').slice(1)
  );

  it('should get the route for a given path', () => {
    const router = new Router();
    const route = router.getRouteForPath(routes, browserPath);
    route.should.deepEqual(routes[0]);
  });
});