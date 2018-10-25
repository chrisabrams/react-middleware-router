function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const React = require('react');

const {
  Component
} = require('react');

const MiddlewareProcessor = require('../lib/process-middleware');

const {
  Route,
  Redirect
} = require('react-router-dom');

class MiddlewareRoute extends Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "redirect", (props, pathname) => {
      const options = {
        pathname,
        state: {
          from: props.location
        }
      };
      return React.createElement(Redirect, {
        to: options
      });
    });

    _defineProperty(this, "renderComponent", props => {
      const Component = this.props.component;

      if (!this.error) {
        return React.createElement(Component, props);
      }

      return this.redirect(props, this.state.redirectPathname);
    });

    this.error = undefined;
    this.inProgress = false;
    this.loadingComponent = this.props.loadingComponent;
    this.processor = new MiddlewareProcessor();
    /*
    NOTE: Can't render a route with a both component & render property
    */

    this.rProps = Object.assign({}, _props);
    delete this.rProps.component;
    this.state = {
      completed: false,
      props: this.rProps,
      redirectPathname: this.props.redirectPathname || '/error' // Default path to send on redirect

    };
  }

  componentWillMount() {
    this.processMiddleware();
  }

  componentWillReceiveProps(nextProps) {
    /*
    This is a Component that was mounted from another route; let the component know that the route has changed
    */
    if (this.state.completed && this.props.computedMatch.path != nextProps.computedMatch.path) {
      this.setState({
        props: nextProps
      });
    }
  }

  processMiddleware() {
    const middleware = this.props.middleware instanceof Array ? this.props.middleware : [];

    if (middleware.length > 0) {
      for (let i = 0, l = middleware.length; i < l; i++) {
        const m = middleware[i];
        this.processor.use(m);
      }

      this.processor.on('end', () => {
        this.setState({
          completed: true //redirectPathname: '/dashboard'

        });
      }).on('error', e => {
        this.error = e;
        this.setState({
          completed: true //redirectPathname: '/dashboard'

        });
      });
      this.processor.next();
    } else {
      this.setState({
        completed: true
      });
    }
  }

  render() {
    const LoadingComponent = this.loadingComponent ? this.loadingComponent : null;
    return this.state.completed ? React.createElement(Route, _extends({}, this.state.props, {
      ref: "route",
      render: this.renderComponent
    })) : React.createElement(LoadingComponent, null);
  }

}

module.exports = MiddlewareRoute;