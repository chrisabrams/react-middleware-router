const MiddlewareProcessor = require('../../src/lib/process-middleware')

describe('React Router Middleware: Middleware Processor', function() {

  it('should emit an event', function(done) {

    const mw = new MiddlewareProcessor()

    mw.on('change', function(foo) {
      expect(foo).to.equal('bar')

      done()
    })

    mw.emit('change', 'bar')

  })

  it('should middleware', function(done) {

    const mw = new MiddlewareProcessor()

    mw.on('end', function(foo) {
      expect(foo).to.equal('bar')

      done()
    })

    mw.on('error', function(e) {
      done(e)
    })

    mw.use((a, next) => {
      next(null, 'bar')
    })

    mw.next()

  })

})
