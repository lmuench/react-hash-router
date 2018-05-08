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

An array of pure functions taking the prop value as their only argument and returning a string
