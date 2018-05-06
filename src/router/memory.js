const {createMemoryHistory} = require('history')
const PropTypes = require('prop-types')
const React = require('react')
const Router = require('./browser')
const warning = require('warning')

class MemoryRouter extends React.Component {
  static propTypes = {
    initialEntries: PropTypes.array,
    initialIndex: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  }

  history = createMemoryHistory(this.props)

  componentWillMount() {
    warning(
      !this.props.history,
      "<MemoryRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { MemoryRouter as Router }`."
    )
  }

  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}

module.exports = MemoryRouter
