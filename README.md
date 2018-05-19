# react-light-router

### usage
1. Copy the `src/router` folder and place it somewhere in your react project
2. Import the Router component using `import LightRouter from './router/LightRouter.js'`
3. Define route objects matching URL fragments with react components
3. Place a Router where the components shall be rendered and pass your routes as props

### LightRouter react component
```jsx
<LightRouter routes={routes} defaultRoute={defaultRoute} />
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

## example react component with react-light-router

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LightRouter from './router/LightRouter.js';
import Hello from './Hello.js';
import NotFound from './NotFound.js';
import LightLink from './router/LightLink';

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
        
        <LightRouter routes={routes} defaultRoute={defaultRoute} />

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
