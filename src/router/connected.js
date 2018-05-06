const React = require('react')
const {Component} = require('react')
const PropTypes = require('prop-types')
const Router = require('./browser')

const { LOCATION_CHANGE } = require('./reducer')

class ConnectedRouter extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
    isSSR: PropTypes.bool
  }

  static contextTypes = {
    store: PropTypes.object
  }

  handleLocationChange = (location, action) => {
    this.store.dispatch({
      type: LOCATION_CHANGE,
      payload: {
        location,
        action
      }
    })
  }

  componentWillMount() {
    const { store: propsStore, history, isSSR } = this.props
    this.store = propsStore || this.context.store

    if (!isSSR)
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange)

    this.handleLocationChange(history.location)
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
  }

  render() {
    return <Router {...this.props} />
  }
}

module.exports = ConnectedRouter
