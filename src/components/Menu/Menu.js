import React, { Component, PropTypes } from 'react'
import './Menu.scss'

import BlobBackground from '../BlobBackground'

class Menu extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = { isBlob: false }

  componentDidMount() {
    this.willAnimateIn(this)
    window.addEventListener('mousewheel', this.handleScroll)
    window.addEventListener('wheel', this.handleScroll)
    window.addEventListener('DOMMouseScroll', this.handleScroll)
  }

  willAnimateIn({ refs }) {
    new TimelineMax()
      // .from(this.refs.blob, .5, {
      //   delay: .2,
      //   yPercent: -100,
      //   ease: Power2.easeOut
      // }, 'start')
      .from(this.refs.content, .5, {
        opacity: 0,
        ease: Power2.easeInOut,
      }, 'start')
      .fromTo(this.refs.blob, 1.5, {
        yPercent: -101
      }, {
        delay: .3,
        yPercent: 20,
        ease: Power4.easeInOut,
      }, 'start')
      .staggerFrom('.Menu-content-text p', .5, {
        y: -20,
        opacity: 0,
        ease: Power2.easeOut
      }, .1)
      .staggerFrom('.Menu-content-social .col', .5, {
        y: -20,
        opacity: 0,
        ease: Power2.easeOut
      }, .1)


    setTimeout(() => this.setState({ isBlob: true }), 500)
  }

  willAnimateOut(done) {
    new TimelineMax({ onComplete: done })
      .staggerTo('.Menu-content-text p', .2, {
        y: -20,
        opacity: 0,
        ease: Power2.easeOut
      }, .03)
      .staggerTo('.Menu-content-social .col', .2, {
        y: -20,
        opacity: 0,
        ease: Power2.easeOut
      }, .03)
      .to(this.refs.blob, 1.5, {
        yPercent: -101,
        ease: Power4.easeInOut,
      })
      .to(this.refs.content, .5, {
        opacity: 0,
        ease: Power2.easeInOut,
      })
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('wheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
  }

  stopEvent = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  stopPropagation = (e) => {
    e.stopPropagation()
  }

  handleScroll = (() => {
    let _thisScroll = 500
    let _lastScroll = 0

    return e => {
      _thisScroll = Date.now()

      if ((_thisScroll - _lastScroll) > 100) {
        this.stopEvent(e)
        this.props.onClose()
      }

      _lastScroll = Date.now()
    }

  })()

  render() {
    const { color, onClose } = this.props
    const { isBlob } = this.state

    return (
      <div className="Menu" onClick={onClose}>

        <div className="Menu-content" ref="content" style={{ color }}>
          <a target="_blank" href="http://gabrielvergnaud.com" className="Menu-content-RPZ">
            Developement by Gabriel Vergnaud
          </a>
          <div className="Menu-content-container" onClick={this.stopEvent}>
            <div className="Menu-content-text">
              <p>My name is Pon…</p>
              <p>
                ... a 24 years old french interactive designer. I’m actually based in Paris and currently in 4th year at HETIC. 
                <br />
                If your heard some good news, I’m looking for a 6 months internship as a <strong>interactive designer</strong> somewhere in the world.
              </p>
            </div>

            <div className="Menu-content-social" onClick={this.stopPropagation}>
              <div className="col">
                <a target="_blank" href="mailto:michael.ponrajah@hetic.net">Email</a>
                <a target="_blank" href="https://pinterest.com">Pinterest</a>
              </div>
              <div className="col">
                <a target="_blank" href="https://linkedin.com">LinkedIn</a>
                <a target="_blank" href="https://twitter.com">Twitter</a>
              </div>
              <div className="col">
                <a target="_blank" href="https://instagram.com">Instagram</a>
                <a target="_blank" href="https://behance.com">Behance</a>
              </div>
            </div>
          </div>
        </div>

        <div ref="blob"  className="Menu-blobBg">
          <BlobBackground
            interactive={false}
            reversed={true}
            color={color}
            isBlob={isBlob}
            blobIntensity={.3} />
            <div className="Menu-secondBlobBg">
              <BlobBackground
                interactive={false}
                color={color}
                isBlob={true}
                blobIntensity={1} />
            </div>
        </div>
      </div>
    )
  }
}


export default Menu
