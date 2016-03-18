import React, { Component } from 'react'
import '../scss/main.scss'
import 'gsap'
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'


class App extends Component {

  componentDidMount() {
    const controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
      }
    })

    const enterTl = new TimelineMax({ paused: true })

    enterTl.add(
      [...this.refs.blobContainer.childNodes].map((el, i) =>
        TweenMax.to(el, .6, {
          yPercent: Math.round(10 + Math.random() * 60),
          delay:  Math.random() * .2,
          ease: Back.easeOut
        })
      )
    )

    new ScrollMagic.Scene({
      triggerElement: '.App',
      offset: 100,
    })
    .on('enter', () => enterTl.timeScale(1).restart())
    .on('leave', () => enterTl.timeScale(1.5).reverse())
    .addTo(controller);

  }

  _handleClickBlob = ({ target }) => {
    TweenMax.to(target, 2, {
      yPercent: Math.round(50 + Math.random() * 50),
      ease: Elastic.easeOut
    })
  }

  render() {

    return (
      <div className="App">

        <div className="header" />
        <div className="background" />

        <div className="blobs">
          <div className="header" />
          <div className="topBlob" />

          <div className="flex" ref="blobContainer">
            <div
              className="blob"
              onClick={this._handleClickBlob} />
            <div
              className="blob"
              onClick={this._handleClickBlob} />
            <div
              className="blob"
              onClick={this._handleClickBlob} />
            <div
              className="blob"
              onClick={this._handleClickBlob} />
            <div
              className="blob"
              onClick={this._handleClickBlob} />
          </div>
        </div>

      </div>
    )
  }
}

export default App
