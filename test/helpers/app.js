const React = require('react')
const {Component} = require('react')
const Route = require('../../src/route')
const Switch = require('../../src/switch')

const Home = () => <div id='home'>Home</div>
const Bar = () => <div id='bar'>Bar</div>
const Baz = () => <div id='baz'>Baz</div>
const Foo = () => <div id='foo'>Foo</div>
const NotFound = () => <div id='notfound'>Not Found</div>
const Spinner = () => <div id='spinner'>Spinner</div>

function barware(o, next) {
  next('The rabbits found us!')
}

function bazware(o, next) {
  setTimeout(function() {
    next()
  }, 250)
}

function fooware(o, next) {
  next()
}

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

module.exports = App
module.exports.components = {
  Bar,
  Baz,
  Foo,
  Home,
  NotFound,
  Spinner
}
