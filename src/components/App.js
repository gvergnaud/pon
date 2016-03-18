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
        duration: "300"
      }
    })

    const tl = new TimelineMax()

    tl
      .add([
        TweenMax.staggerTo('.blob', 1, {
          yPercent: 70
        }, .2)
      ])

    new ScrollMagic.Scene({
      triggerElement: '.App'
    })
    .setTween(tl)
    .addIndicators()
    .addTo(controller);

  }

  render() {

    return (
      <div className="App">

        <div className="header" />

        <div className="blobs">
          <div className="topBlob" />

          <div className="flex" >
            <div className="blob" />
            <div className="blob" />
            <div className="blob" />
            <div className="blob" />
            <div className="blob" />
          </div>
        </div>

      </div>
    )
  }
}

export default App
