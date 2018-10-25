function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const invariant = require('invariant');

const PropTypes = require('prop-types');

const React = require('react');

const warning = require('warning');

class Router extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      match: this.computeMatch(this.props.history.location.pathname)
    });
  }

  getChildContext() {
    return {
      router: _objectSpread({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  }

  computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  }

  componentWillMount() {
    const {
      children,
      history
    } = this.props;
    invariant(children == null || React.Children.count(children) === 1, "A <Router> may have only one child element");
    this.unlisten = history.listen(() => {
      this.setState({
        match: this.computeMatch(history.location.pathname)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    warning(this.props.history === nextProps.history, "You cannot change <Router history>");
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const {
      children
    } = this.props;
    return children ? React.Children.only(children) : null;
  }

}

_defineProperty(Router, "propTypes", {
  history: PropTypes.object.isRequired,
  children: PropTypes.node
});

_defineProperty(Router, "contextTypes", {
  router: PropTypes.object
});

_defineProperty(Router, "childContextTypes", {
  router: PropTypes.object.isRequired
});

module.exports = Router;