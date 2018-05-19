# react-light-router

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
