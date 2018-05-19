# react-light-router
Sources in `src/lib`

#### install
`npm install --save react-light-router`

#### import
`import { LightLink, LightRouter } from 'react-light-router'`

## LightLink
```jsx
<LightLink path={'/foo/bar'}>
  <button>Click me!</button>
</LightLink>
```
Turns its child component (or any content between its opening and closing tag) into a clickable hash-based link.

Clicking on a LightLink with a path prop `/foo/bar` will replace the browser's URL fragment with `#/foo/bar`.

E.g. `example.com` will become `example.com/#/foo/bar` without a page-reload. The LightRouter component will consequently render a React component which matches this hash-based path.

### props

#### path
Type: `string`

A hash-based path which the component links to.


## LightRouter
```jsx
<LightRouter routes={routes} defaultRoute={defaultRoute} />
```
Display a route's component if the route's path matches the current URL's fragment (excluding `#`)

A route's path `/foo/bar` will match `example.com/#/foo/bar`

### props

#### routes
Type: `array`

An array of routes

#### defaultRoute
Type: `route`

An optional default route to be used, when no route's path matches the current URL

## route object

#### simplest example
```jsx
{
  path: '/hello',
  component: Hello
}
```

#### route with guards, props, propsFromPath and plugs
```jsx
{
  path: '/hello/:first/:last',
  component: Hello,
  guards: [fooGuard, barGuard],
  props: [{ foo: 'bar' }],
  propsFromPath: [{
    prop: 'first',
    segment: ':first',
    plugs: [fooPlug, barPlug]
  }, {
    prop: 'last',
    segment: ':last'
  }]
}
```

## route object properties

#### path
Type: `string`

A path, which will be compared to the current URL's fragment

e.g. `/foo/:foo_id/bar/:bar_id`

The path above will match `#/foo/4/bar/2`, `#/foo/4/bar/2/foobar` and `#/foo/4/bar/2?foo=bar`

#### component
Type: `react component`

A React component to display, if the path matches

#### guards
Type: `array`

An array of parameterless functions which have to return true for a match

#### props
Type: `array`

An array of props

e.g. `[{foo: bar}]`

#### propsFromPath
Type: `Array`

An array of propFromPath objects


## propFromPath object properties

#### segment
Type: `string`

The name of a prop

#### segment
Type: `string`

A string that equals exactly one segment of the route's path

#### plugs
Type: `array`

An array of pure functions (one argument, one return value) intended for modifying the prop value

## demo
Sources in `src/demo`

Start with `npm start`

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello.js';
import NotFound from './NotFound.js';
import { LightRouter, LightLink } from '../lib';

const abbreviate = str => {
  return str.charAt(0) + '.';
}

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const limitLength = str => {
  return str.slice(0, 20);
}

const userIsLoggedIn = () => true;

const routes = [{
  path: '/hello/:first/:last',
  component: Hello,
  guards: [userIsLoggedIn],
  propsFromPath: [{
      prop: 'first',
      segment: ':first',
      plugs: [limitLength, abbreviate, capitalize]
    }, {
      prop: 'last',
      segment: ':last',
      plugs: [limitLength, capitalize]
    }]
}]

const defaultRoute = {
  component: NotFound
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Light Router</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <LightRouter routes={routes} defaultRoute={defaultRoute} style={{ padding: '16px' }} />

        <LightLink path={'/hello/foo/bar'} style={{ padding: '4px' }}>
          <button>I am Foo Bar</button>
        </LightLink>

        <LightLink path={'/hello/bar/foo'} style={{ padding: '4px' }}>
          <button>I am Bar Foo</button>
        </LightLink>
        
      </div>
    );
  }
}

export default App;
```
