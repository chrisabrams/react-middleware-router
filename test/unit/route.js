const React = require('react')
const ReactDOM = require('react-dom')
const { mount } = require('enzyme')
const MemoryRouter = require('../../src/router/memory')

const App = require('../helpers/app')
const { Bar, Baz, Foo, Home, NotFound, Spinner } = require('../helpers/app').components

describe('React Router Middleware: Switch and Route', function() {

  it('should not match an invalid path', () => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/womp']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Foo)).to.have.length(0)
    expect(wrapper.find(Home)).to.have.length(0)
    expect(wrapper.find(NotFound)).to.have.length(1)
  
  })

  it('should match a valid path', () => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Foo)).to.have.length(0)
    expect(wrapper.find(Home)).to.have.length(1)
    expect(wrapper.find(NotFound)).to.have.length(0)
  
  })

  it('should match a valid path with middleware', () => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Foo)).to.have.length(1)
    expect(wrapper.find(Home)).to.have.length(0)
    expect(wrapper.find(NotFound)).to.have.length(0)
  
  })

  it('should not match a valid path with middleware which returns an error', () => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/bar']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Foo)).to.have.length(0)
    expect(wrapper.find(Home)).to.have.length(0)
    expect(wrapper.find(NotFound)).to.have.length(1)
  
  })

  it('should match a valid path with async middleware', (done) => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/baz']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    setTimeout(function() {
      wrapper.update()

      expect(wrapper.find(Bar)).to.have.length(0)
      expect(wrapper.find(Baz)).to.have.length(1)
      expect(wrapper.find(Foo)).to.have.length(0)
      expect(wrapper.find(Home)).to.have.length(0)
      expect(wrapper.find(NotFound)).to.have.length(0)

      done()
    }, 255)
  
  })

  it('should show a spinner while awaiting on async middleware', (done) => {
  
    const wrapper = mount(
      <MemoryRouter initialEntries={['/baz']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Spinner)).to.have.length(1)

    setTimeout(function() {
      wrapper.update()

      expect(wrapper.find(Bar)).to.have.length(0)
      expect(wrapper.find(Baz)).to.have.length(1)
      expect(wrapper.find(Foo)).to.have.length(0)
      expect(wrapper.find(Home)).to.have.length(0)
      expect(wrapper.find(NotFound)).to.have.length(0)
      expect(wrapper.find(Spinner)).to.have.length(0)

      done()
    }, 255)
  
  })

})
