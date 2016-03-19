import React, { PropTypes, Component } from 'react'
import './BlobBackground.scss'

import 'gsap'

class BlobBackground extends Component {

  static proptypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number,
    isBlob: PropTypes.bool,
  }

  componentDidMount() {

    this.blobTl = new TimelineMax({ paused: true })
    this.antiBlobTl = new TimelineMax({ paused: true })

    this.blobTl.add(
      [...this.refs.blobContainer.childNodes].map((el, i) =>
        TweenMax.to(el, 2.7, {
          yPercent: Math.round(10 + Math.random() * 35),
          ease: Elastic.easeOut
        })
      )
    )

    this.antiBlobTl.add(
      [...this.refs.antiBlobContainer.childNodes].map(el =>
        TweenMax.to(el, 2.7, {
          yPercent: - Math.round(10 + Math.random() * 6),
          ease: Elastic.easeOut
        })
      )
    )

    if (this.props.isBlob) this.playAnimation()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBlob !== this.props.isBlob) {
      if (this.props.isBlob) this.playAnimation()
      else this.reverseAnimation()
    }
  }

  playAnimation = () => {
    this.blobTl.timeScale(1).restart()
    this.antiBlobTl.timeScale(1).restart()
  }

  reverseAnimation = () => {
    this.blobTl.timeScale(1.5).reverse()
    this.antiBlobTl.timeScale(1.5).reverse()
  }

  touchBlob = ({ target }) => {
    TweenMax.to(target, 2, {
      yPercent: Math.round(15 + Math.random() * 20),
      ease: Elastic.easeOut
    })
  }

  render() {

    const { color, height, isBlob } = this.props

    return (
      <div className="BlobBackground" ref="Blob" style={{ height: height || window.innerHeight * 1.5 }}>

        <div className="container">
          <div
            className="background"
            style={{ backgroundColor: color }} />

          <div className="flex blobContainer" ref="blobContainer">
            <div
              className={`blob ${isBlob ? 'shadow' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
          </div>

          <div className="flex antiBlobContainer" ref="antiBlobContainer">
            <div className={`antiBlob ${isBlob ? 'shadow' : ''}`} />
            <div className={`antiBlob ${isBlob ? 'shadow' : ''}`} />
            <div className={`antiBlob ${isBlob ? 'shadow' : ''}`} />
            <div className={`antiBlob ${isBlob ? 'shadow' : ''}`} />
          </div>
        </div>

      </div>
    )
  }
}

export default BlobBackground
