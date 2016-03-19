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
      else {
        if (route && route.path !== currentRoute.path) {
          currentRoute.component.prototype.willAnimateOut.call(routeElement, () => {
            this.setState({ currentRoute: route })
          })
        }

      }
    })

  }

  setPage(path) {
    history.push(path)
  }

  render() {

    return (
      <div className="App">

        {this.state.currentRoute &&
          <this.state.currentRoute.component ref="routeElement" />
        }

        {/*<BlobBackground color="#1ca7a3" height={window.innerHeight * 1.5} />
        <BlobBackground color="#571b34" height={window.innerHeight * 1.5} />
        <BlobBackground color="#ba8300" height={window.innerHeight * 1.5} />*/}

      </div>
    )
  }
}

export default App
