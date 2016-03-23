import React, { Component, PropTypes } from 'react'
import '../scss/main.scss'
import routes from '../routes'
import { createHistory } from 'history'
import { getDocumentHeight, getScrollTop } from '../utils'

import BlobBackground from './BlobBackground'
import Loader from './Loader'
import Menu from './Menu'
import Mobile from '../views/Mobile'


const history = createHistory()


class App extends Component {

  static childContextTypes = {
    setPage: PropTypes.func.isRequired,
    setCurrentProject: PropTypes.func.isRequired,
    getCurrentProject: PropTypes.func.isRequired,
    getCurrentColor: PropTypes.func.isRequired,
  }

  state = {
    currentRoute: null,
    currentProject: null,
    isMenuOpened: false,
    isAtTop: true,
    showColor: false,
    isLoaded: false,
  }

  getChildContext() {
    return {
      setPage: this.setPage,
      setCurrentProject: this.setCurrentProject,
      getCurrentProject: this.getCurrentProject,
      getCurrentColor: this.getCurrentColor,
    }
  }

  componentDidMount() {

    history.listen(location => {
      const route = routes[location.pathname]
      const { state: { currentRoute }, refs: { routeElement } } = this

      if (!currentRoute) this.setState({ currentRoute: route || routes[routes.default] })
      else if (route && route.path !== currentRoute.path) {
        currentRoute.component.prototype.willAnimateOut.call(routeElement, () => {
          this.setState({ currentRoute: route })
        })
      }
    })

    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.forceUpdate()
  }

  handleScroll = (e) => {
    const { isAtTop, showColor } = this.state
    if (!getScrollTop() && !isAtTop) this.setState({ isAtTop: true })
    else if (getScrollTop() && isAtTop) this.setState({ isAtTop: false })


    if (
      getScrollTop() > window.innerHeight * 1.5
      && getScrollTop() < getDocumentHeight() - (window.innerHeight * 1.5)
    ) {
      if (!showColor) this.setState({ showColor: true })
    } else {
      if (showColor) this.setState({ showColor: false })
    }
  }

  setPage(path) {
    history.push(path)
  }

  setCurrentProject = (currentProject) => {
    this.setState({ currentProject })
  }

  getCurrentProject = () => this.state.currentProject

  toggleOpenMenu = () => {
    if (this.state.isMenuOpened) {
      this.refs.menu.constructor.prototype.willAnimateOut.call(this.refs.menu, () => {
        this.setState({ isMenuOpened: false })
      })
    } else {
      this.setState({ isMenuOpened: true })
    }
  }

  getCurrentColor = () => {
    const { currentProject, showColor, isMenuOpened } = this.state
    return !showColor && isMenuOpened && currentProject
      ? currentProject.color
      : showColor && currentProject
        ? currentProject.color
        : 'white'
  }

  getMenuColor = () => {
    const { currentProject } = this.state
    return currentProject ? currentProject.color : '#FFB400'
  }

  getCursorTranslate = () => {
    if (this.state.currentProject) {
      switch (this.state.currentProject.title) {
        case 'Appartement Rochard':
          return '0'
        case 'Jaiye Music App':
          return '65%'
        case 'Dylerz Magazine':
          return '130%'
      }
    }
  }

  onLoad = () => {
    this.refs.loader.constructor.prototype.willAnimateOut.call(this.refs.loader, () => {
      this.setState({ isLoaded: true })
    })
  }

  isMobile = () => {
    return window.innerWidth < 880 || window.innerHeight < 520
  }

  render() {

    const { isMenuOpened, isAtTop, isLoaded } = this.state

    return (
      <div className="App">

        {/*<div className="lines">
          <div className="line line--first" />
          <div className="line line--second" />
          <div className="line line--third" />
          <div className="line line--fourth" />
        </div>*/}

        {this.isMobile() ? (
          <Mobile />
        ) : (
          <span>
            <nav className="App-navigation">
              <div className="App-navigation-menuIcon" onClick={this.toggleOpenMenu}>
                <div
                  className={`App-navigation-menuIcon-before ${isMenuOpened ? 'App-navigation-menuIcon-before--cross' : ''}`}
                  style={{ backgroundColor: this.getCurrentColor() }} />
                <div
                  className={`App-navigation-menuIcon-after  ${isMenuOpened ? 'App-navigation-menuIcon-after--cross' : ''}`}
                  style={{ backgroundColor: this.getCurrentColor() }} />
              </div>

              <div className={`App-navigation-name ${!isAtTop ? 'App-navigation-name--hidden' : ''}`}>
                Portfolio 2016 - 2017
              </div>

              <div className="App-navigation-projectCursor" onClick={() => this.setPage('/')}>
                <div
                  className="cursor"
                  style={{
                    backgroundColor: this.getCurrentColor(),
                    transform: `translateY(${this.getCursorTranslate()})`
                  }} />
                <div
                  className="point point-first"
                  style={{ backgroundColor: this.getCurrentColor() }} />
                <div
                  className="point point-second"
                  style={{ backgroundColor: this.getCurrentColor() }} />
                <div
                  className="point point-third"
                  style={{ backgroundColor: this.getCurrentColor() }} />
                <div
                  className="point point-fourth"
                  style={{ backgroundColor: this.getCurrentColor() }} />
              </div>
            </nav>

            {isMenuOpened && (
              <Menu ref="menu" color={this.getMenuColor()} onClose={this.toggleOpenMenu} />
            )}

            {!isLoaded ? (
              <Loader ref="loader" onLoad={this.onLoad} />
            ) : (
              this.state.currentRoute &&
                <this.state.currentRoute.component ref="routeElement" />
            )}
          </span>
        )}
      </div>
    )
  }
}

export default App
