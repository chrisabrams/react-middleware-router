# react-middleware-router
A middleware-based router for React. This router is designed to be a drop-in replacement for both `react-router` and if using redux `react-router-redux`. I originally designed this router as an example for a friend to show how logic can be performed before a route renders a component; in this case it was a single page app making an authentication request but I made the project generic enough that any logic could be applied as long as it could be run inside a middleware function.

## Installation

```
npm install react-middleware-router
```

or

```
yarn add react-middleware-router
```

## Usage

### Browser Routing
Here is an example of a small app:

```
const { BrowserRouter, Route, Switch } = require('react-middleware-router')

class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
        <Switch errorComponent={NotFound} loadingComponent={Spinner}>
          <Route path="/bar" middleware={[barware]} component={Bar} />
          <Route path="/baz" middleware={[bazware]} component={Baz} />
          <Route path="/foo" middleware={[fooware]} component={Foo} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}
```

Notice a few additions:
- `errorComponent` is optionally supplied to `Switch`. There is no need to create a "catch-all" route for errors.
- `loadingComponent` is optionally supplied to `Switch`. This enables an app-wide loading/spinner component which is rendered until the route with middleware has completeing processing the middleware.
- `middleware` is optionally supplied to `Rotue`. This is an array of functions which run before the `component` for the route is rendered. If any middleware return an error the `errorComponent` is rendered instead.

### Browser Routing with Redux

```
const { ConnectedRouter, Route, Switch } = require('react-middleware-router')
const { Provider } = require('react-redux')

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch errorComponent={NotFound} loadingComponent={Spinner}>
            <Route path="/bar" middleware={[barware]} component={Bar} />
            <Route path="/baz" middleware={[bazware]} component={Baz} />
            <Route path="/foo" middleware={[fooware]} component={Foo} />
            <Route exact path="/" component={Home} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
```

### Middleware
Here is an exampe of a middleware function:

```
function bazware(o, next) {
  setTimeout(function() {
    next()
  }, 250)
}
```

- The first argument, property `o`, is the object that was optionally passed from a previous middleware.
- The second argument, function `next`, is the callback to tell the middleware it has completed (or errored).
- The first argument to `next` is always an error or `null`.
- The second argument to `next` is the data you want to pass to the next middleware.

#### Passing data or errors to middleware

##### Data
`next(null, {some: 'data'})`

##### Error
`next({some: 'error'})`
