# react-light-router

### LightRouter React component
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
