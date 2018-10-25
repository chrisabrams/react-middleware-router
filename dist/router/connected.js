function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const React = require('react');

const {
  Component
} = require('react');

const PropTypes = require('prop-types');

const Router = require('./browser');

const {
  LOCATION_CHANGE
} = require('./reducer');

class ConnectedRouter extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleLocationChange", (location, action) => {
      this.store.dispatch({
        type: LOCATION_CHANGE,
        payload: {
          location,
          action
        }
      });
    });
  }

  componentWillMount() {
    const {
      store: propsStore,
      history,
      isSSR
    } = this.props;
    this.store = propsStore || this.context.store;
    if (!isSSR) this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  render() {
    return React.createElement(Router, this.props);
  }

}

_defineProperty(ConnectedRouter, "propTypes", {
  store: PropTypes.object,
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
  isSSR: PropTypes.bool
});

_defineProperty(ConnectedRouter, "contextTypes", {
  store: PropTypes.object
});

module.exports = ConnectedRouter;