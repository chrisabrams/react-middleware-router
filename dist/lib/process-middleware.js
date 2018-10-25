const EventEmitter = require('gestalt-event-emitter');

const Middleware = require('gestalt-middleware');

class MiddlewareProcessor {
  constructor() {
    const ee = this.ee = new EventEmitter();
    this.emit = ee.emit.bind(ee);
    this.on = ee.on.bind(ee);
    const mw = this.mw = new Middleware();
    mw.emit = ee.emit.bind(ee);
    mw.on = ee.on.bind(ee);
    this.next = mw.next.bind(mw);
    this.use = mw.use.bind(mw);
  }

}

module.exports = MiddlewareProcessor;