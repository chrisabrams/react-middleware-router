const React = require('react')
const PropTypes = require('prop-types')
const warning = require('warning')
const invariant = require('invariant')
const matchPath = require('./match-path')

class Switch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  }

  static propTypes = {
    children: PropTypes.node,
    //errorComponent: PropTypes.object,
    location: PropTypes.object
  }

  componentWillMount() {
    invariant(
      this.context.router,
      "You should not use <Switch> outside a <Router>"
    )
  }

  componentWillReceiveProps(nextProps) {
    warning(
      !(nextProps.location && !this.props.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )
  }

  render() {
    const { route } = this.context.router
    const { children } = this.props
    const ErrorComponent = this.props.errorComponent
    const location = this.props.location || route.location

    let match, child
    React.Children.forEach(children, element => {
      if (match == null && React.isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from
        } = element.props
        const path = pathProp || from

        child = element

        match = matchPath(
          location.pathname,
          { path, exact, strict, sensitive },
          route.match
        )
      }
    })

    return match
      ? React.cloneElement(child, { loadingComponent: this.props.loadingComponent, location, computedMatch: match })
      : (this.props.errorComponent) ? <ErrorComponent /> : null
  }
}

module.exports = Switch
