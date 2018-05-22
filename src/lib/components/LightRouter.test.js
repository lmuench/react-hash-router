import React from 'react';
import ReactDOM from 'react-dom';
import LightRouter from './LightRouter.js';
import LightUrl from './LightUrl';
import should from 'should';

describe('getRouteForPath()', () => {
  const routes = [
    {
      path: '/hello/:first/:last',
      component: {},
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    },
    {
      path: '/ticker/<symbol>/price',
      component: {},
      propsFromPath: [
        { prop: 'symbol', segment: '<symbol>' }
      ]
    }
  ]

  const defaultRoute = {
    component: {}
  }

  const correctBrowserPathsA = [
    '#/hello/peter/piper',
    '#/hello/peter/piper/foo',
    '#/hello/peter/piper?foo=bar',
    '#/hello/peter/piper?foo=bar&bar=foo',
    '#/hello/peter/piper/?foo=bar&bar=foo'
  ].map(path => LightUrl.extractSegments(path));

  const correctBrowserPathsB = [
    '#/ticker/BTCUSDT/price',
    '#/ticker/BTCUSDT/price/',
    '#/ticker/BTCUSDT/price//',
    '#/ticker/BTCUSDT/price/change'
  ].map(path => LightUrl.extractSegments(path));

  const incorrectBrowserPathsA = [
    '#/hello/peter//piper',
    '#/hello/peter/',
    '#/hello/peter',
    '#/hello/',
    '#/',
    '#hello/peter/piper/foo',
  ].map(path => LightUrl.extractSegments(path));

  const incorrectBrowserPathsB = [
    '#/ticker/v2/BTCUSDT/price',
    '#/ticker/BTCUSDT/v2/price',
    '#/ticker/BTCUSDT/volume',
    '#/ticker/price/BTCUSDT',
    '#/ticker/price'
  ].map(path => LightUrl.extractSegments(path));


  it('should get the route for a given path', () => {
    const router = new LightRouter();

    correctBrowserPathsA.forEach(browserPath => {
      const route = router.getRouteForPath(routes, browserPath);
      route.should.deepEqual(routes[0]);
    });
    
    correctBrowserPathsB.forEach(browserPath => {
      const route = router.getRouteForPath(routes, browserPath);
      route.should.deepEqual(routes[1]);
    });
  });

  it('should not return any route for an incorrect path', () => {
    const router = new LightRouter();

    incorrectBrowserPathsA.forEach(browserPath => {
      const route = router.getRouteForPath(routes, browserPath);
      should.equal(route, null);
    });

    incorrectBrowserPathsB.forEach(browserPath => {
      const route = router.getRouteForPath(routes, browserPath);
      should.equal(route, null);
    });
  });
});

describe('getPropsForRouteFromPath()', () => {
  it('should get props from the path', () => {
    const router = new LightRouter();
    
    let route = {
      path: '/hello/:first/:last',
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
    let segments = ['hello', 'peter', 'piper'];
    let expected = { first: 'peter', last: 'piper' };
    let props = router.getPropsForRouteFromPath(route, segments);
    props.should.deepEqual(expected);

    route = {
      path: '/foo/bar/:first/:last',
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
    segments = ['foo', 'bar', 'peter', 'piper'];
    expected = { first: 'peter', last: 'piper' };
    props = router.getPropsForRouteFromPath(route, segments);
    props.should.deepEqual(expected);

    route = {
      path: '/foo/:first/bar/:last',
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
    segments = ['foo', 'peter', 'bar', 'piper'];
    expected = { first: 'peter', last: 'piper' };
    props = router.getPropsForRouteFromPath(route, segments);
    props.should.deepEqual(expected);

    route = {
      path: '/:first/foo/bar/:last',
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
    segments = ['peter', 'foo', 'bar', 'piper'];
    expected = { first: 'peter', last: 'piper' };
    props = router.getPropsForRouteFromPath(route, segments);

    props.should.deepEqual(expected);
    route = {
      path: '/:last/:first',
      propsFromPath: [
        { prop: 'first', segment: ':first' },
        { prop: 'last', segment: ':last' }
      ]
    }
    segments = ['piper', 'peter'];
    expected = { first: 'peter', last: 'piper' };
    props = router.getPropsForRouteFromPath(route, segments);
    props.should.deepEqual(expected);

  });
});