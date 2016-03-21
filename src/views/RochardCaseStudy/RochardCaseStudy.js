import React, { Component, PropTypes } from 'react'
import projects from '../../projects'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'
import 'gsap'
import 'gsap.ScrollToPlugin'

import BlobBackground from '../../components/BlobBackground'


const project = projects.rochard


class RochardCaseStudy extends Component {

  static propTypes = {}

  state = { blob: false }

  componentDidMount() {
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {
    // scroll
    TweenMax.fromTo(window, 1, {
      scrollTo: { y: 0 },
      ease: Power4.easeInOut
    }, {
      scrollTo: { y: window.innerHeight },
      ease: Power4.easeInOut
    })

    const controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
      }
    })

    new ScrollMagic.Scene({
      triggerElement: refs.blobBg,
      offset: window.innerHeight / 2,
    })
      .on('enter', () => this.setState({ blob: true }))
      .addTo(controller)
  }

  willAnimateOut(done) {
    done()
  }

  render() {
    return (
      <div className="RochardCaseStudy">
        <div ref="blobBg">
          <BlobBackground isBlob={this.state.blob} color={project.color} />
        </div>
      </div>
    )
  }
}


export default RochardCaseStudy
