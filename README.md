# react-middleware-router
A middleware-based router for React.

## Usage
This router is designed to be a drop-in replacement for `react-router`.

### Switch and Route
Here is an example of a small app:

```
class App extends Component {

  render() {
    return (
      <Switch errorComponent={NotFound} loadingComponent={Spinner}>
        <Route path="/bar" middleware={[barware]} component={Bar} />
        <Route path="/baz" middleware={[bazware]} component={Baz} />
        <Route path="/foo" middleware={[fooware]} component={Foo} />
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}
```

Notice a few additions:
1. `errorComponent` is optionally supplied to `Switch`. There is no need to create a "catch-all" route for errors.
2. `loadingComponent` is optionally supplied to `Switch`. This enables a app-wide loading/spinner component which is rendered until the route with middleware has completeing processing the middleware.
3. `middleware` is optionally supplied to `Rotue`. This is an array of functions which run before the `component` for the route is rendered. If any middleware fail the `errorComponent` is rendered instead.

### Middleware
Here is an exampe of a middleware function:

```
function bazware(o, next) {
  setTimeout(function() {
    next()
  }, 250)
}
```

1. The first argument, property `o`, is the object that was optionally passed from a previous middleware.
2. The second argument, function `next`, is the callback to tell the middleware it has completed.
2a. The first argument to `next` is always an error or `null`.
2b. The second argument to `next` is the data you want to pass to the next middleware.

#### Passing data or errors to middleware

##### Data
`next(null, {some: 'data'})`

##### Error
`next({some: 'error'})`
