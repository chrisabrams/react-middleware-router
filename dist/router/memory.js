function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  createMemoryHistory
} = require('history');

const PropTypes = require('prop-types');

const React = require('react');

const Router = require('./browser');

const warning = require('warning');

class MemoryRouter extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "history", createMemoryHistory(this.props));
  }

  componentWillMount() {
    warning(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
  }

  render() {
    return React.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  }

}

_defineProperty(MemoryRouter, "propTypes", {
  initialEntries: PropTypes.array,
  initialIndex: PropTypes.number,
  getUserConfirmation: PropTypes.func,
  keyLength: PropTypes.number,
  children: PropTypes.node
});

module.exports = MemoryRouter;