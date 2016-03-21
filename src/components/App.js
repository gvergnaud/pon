import React, { Component, PropTypes } from 'react'
import '../scss/main.scss'
import routes from '../routes'
import { createHistory } from 'history'

import BlobBackground from './BlobBackground'


const history = createHistory()


class App extends Component {

  static childContextTypes = {
    setPage: PropTypes.func.isRequired
  }

  state = {}

  getChildContext() {
    return { setPage: this.setPage }
  }

  componentDidMount() {

    history.listen(location => {
      const route = routes[location.pathname]
      const { state: { currentRoute }, refs: { routeElement } } = this

      if (!currentRoute) this.setState({ currentRoute: route })
      else if (route && route.path !== currentRoute.path) {
        currentRoute.component.prototype.willAnimateOut.call(routeElement, () => {
          this.setState({ currentRoute: route })
        })
      }
    })

    window.addEventListener('resize', this.handleResize)

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.forceUpdate()
  }

  setPage(path) {
    history.push(path)
  }

  render() {

    return (
      <div className="App">

        <div className="lines">
          <div className="line line--first" />
          <div className="line line--second" />
          <div className="line line--third" />
          <div className="line line--fourth" />
        </div>

        {this.state.currentRoute &&
          <this.state.currentRoute.component ref="routeElement" />
        }

      </div>
    )
  }
}

export default App
