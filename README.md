# Router react component

```jsx
<Router routes={routes} defaultRoute={defaultRoute} />
```
Display a route's component if the route's path matches the current URL's fragment (excluding `#`)

A route's path `/foo/bar` will match a URL `myurl.com/#/foo/bar`

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

A react component to display, if the path matches

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

## example react component with router

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './Router.js';
import Hello from './Hello.js';
import NotFound from './NotFound.js';

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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router routes={routes} defaultRoute={defaultRoute} />
      </div>
    );
  }
}

export default App;
```
