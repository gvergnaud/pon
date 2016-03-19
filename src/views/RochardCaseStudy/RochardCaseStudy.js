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

  static propTypes = {

  }

  state = { blob: false }

  componentDidMount() {
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {
    const tl = new TimelineMax({ paused: true })

    tl
      .to(window, 1, {
        scrollTo: { y: window.innerHeight / 1.5 },
        ease: Power4.easeOut
      });

    tl.restart()

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
      .on('leave', () => this.setState({ blob: false }))
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
