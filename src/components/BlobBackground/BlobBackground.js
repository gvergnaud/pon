import React, { PropTypes, Component } from 'react'
import './BlobBackground.scss'

import 'gsap'

class BlobBackground extends Component {

  static proptypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number,
    isBlob: PropTypes.bool,
    reversed: PropTypes.bool,
    interactive: PropTypes.bool
  }

  componentDidMount() {

    this.tl = new TimelineMax({ paused: true })

    const { reversed } = this.props

    this.tl.add([
      ...[...this.refs.blobContainer.childNodes].map((el, i) =>
        TweenMax.to(el, 2.3, {
          yPercent: reversed ? - Math.round(12 + Math.random() * 6) : Math.round(12 + Math.random() * 35),
          ease: Elastic.easeOut
        })
      ),
      ...[...this.refs.antiBlobContainer.childNodes].map(el =>
        TweenMax.to(el, 2.3, {
          yPercent: reversed ? Math.round(12 + Math.random() * 35) : - Math.round(12 + Math.random() * 6),
          ease: Elastic.easeOut
        })
      )
    ])

    if (this.props.isBlob) this.playAnimation()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBlob !== this.props.isBlob) {
      if (this.props.isBlob) this.playAnimation()
      else this.reverseAnimation()
    }
  }

  playAnimation = () => {
    this.tl.timeScale(1).restart()
  }

  reverseAnimation = () => {
    this.tl.timeScale(1.5).reverse()
  }

  touchBlob = ({ target }) => {
    if (!this.props.reversed) TweenMax.to(target, 2, {
      yPercent: Math.round(15 + Math.random() * 20),
      ease: Elastic.easeOut
    })
  }

  touchAntiBlob = ({ target }) => {
    if (this.props.reversed) TweenMax.to(target, 2, {
      yPercent: Math.round(15 + Math.random() * 20),
      ease: Elastic.easeOut
    })
  }

  render() {

    const { color, height, isBlob, reversed } = this.props

    return (
      <div className="BlobBackground" ref="Blob" style={{ height: height || window.innerHeight * 1.5 }}>

        <div className={`container`}>
          <div
            className={`background  ${reversed ? 'background--reversed' : ''}`}
            style={{ backgroundColor: color }} />

          <div className={`flex blobContainer  ${reversed ? 'blobContainer--reversed' : ''}`} ref="blobContainer">
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color }}
              onMouseEnter={this.touchBlob} />
          </div>

          <div className={`flex antiBlobContainer ${reversed ? 'antiBlobContainer--reversed' : ''}`} ref="antiBlobContainer">
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              onMouseEnter={this.touchAntiBlob} />
          </div>
        </div>

      </div>
    )
  }
}

export default BlobBackground
