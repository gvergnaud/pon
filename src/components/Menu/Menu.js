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
    TweenMax.fromTo(refs.content, .1, {
      opacity: 0,
    }, {
      delay: .1,
      opacity: 1,
      ease: Power4.easeOut,
    })

    TweenMax.fromTo(refs.blob, .7, {
      yPercent: -30
    }, {
      yPercent: 35,
      ease: Power4.easeOut,
    })

    TweenMax.fromTo(refs.blob, .3, {
      opacity: 0
    }, {
      opacity: 1,
      ease: Power4.easeOut,
    })
    setTimeout(() => this.setState({ isBlob: true }), 100)
  }

  willAnimateOut(done) {
    this.setState({ isBlob: false })
    setTimeout(() => {
      new TimelineMax({ onComplete: done })
        .to(this.refs.blob, .7, {
          yPercent: -30,
          ease: Power4.easeIn,
        })
        .to(this.refs.content, .1, {
          delay: .2,
          opacity: 0,
          ease: Power2.easeOut,
        }, 'start')
        .to(this.refs.blob, .5, {
          delay: .2,
          opacity: 0,
          ease: Power2.easeOut
        }, 'start')
    }, 10)
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('wheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
  }

  handleScroll = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    const { color, onClose } = this.props
    const { isBlob } = this.state

    return (
      <div className="Menu" onClick={onClose}>
        <div className="Menu-content" ref="content">

        </div>
        <div ref="blob"  className="Menu-blobBg">
          <BlobBackground reversed={true} color={color} isBlob={isBlob} blobIntensity={.2} />
        </div>
      </div>
    )
  }
}


export default Menu
