import React, { PropTypes, Component } from 'react'
import './BlobBackground.scss'
import 'gsap'
import 'animation.gsap'
import ScrollMagic from 'ScrollMagic'



class BlobBackground extends Component {

  static proptypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number,
    isBlob: PropTypes.bool,
    reversed: PropTypes.bool,
    interactive: PropTypes.bool,
    blobIntensity: PropTypes.number,
    isParallax: PropTypes.bool,
  }

  static defaultProps = {
    height: window.innerHeight * 1.5,
    isBlob: false,
    reversed: false,
    interactive: false,
    isParallax: false,
    blobIntensity: 1,
  }

  componentDidMount() {
    const { reversed, blobIntensity, isParallax } = this.props

    this.tl = new TimelineMax({ paused: !isParallax })

    this.tl.add([
      ...[...this.refs.blobContainer.childNodes].map((el, i) =>
        TweenMax.to(el, 2.3, {
          yPercent: reversed
            ? - Math.round(12 + Math.random() * (7 * blobIntensity))
            : Math.round(12 + Math.random() * (18 * blobIntensity)),
          ease: isParallax ? Back.easeOut : Elastic.easeOut
        })
      ),
      ...[...this.refs.antiBlobContainer.childNodes].map(el =>
        TweenMax.to(el, 2.3, {
          yPercent: reversed
            ? Math.round(12 + Math.random() * (18 * blobIntensity))
            : - Math.round(12 + Math.random() * (7 * blobIntensity)),
          ease: isParallax ? Back.easeOut : Elastic.easeOut
        })
      )
    ])

    if (isParallax) {
      this.controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: "onLeave"
        }
      })

      new ScrollMagic.Scene({
        triggerElement: this.refs.Blob,
        offset: - window.innerHeight * 1.35,
        duration: this.tl.totalDuration() * window.innerHeight,
      })
        .setTween(this.tl)
        .addTo(this.controller)
    }

    if (this.props.isBlob) this.playAnimation()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBlob !== this.props.isBlob) {
      if (this.props.isBlob) this.playAnimation()
      else this.reverseAnimation()
    }
  }

  componentWillUnmount() {
    if (this.controller) this.controller.destroy()
  }

  playAnimation = () => {
    if (!this.props.isParallax) this.tl.timeScale(1).restart()
  }

  reverseAnimation = () => {
    if (!this.props.isParallax) this.tl.timeScale(1.5).reverse()
  }

  touchBlob = ({ target }) => {
    if (!this.props.reversed && !this.props.isParallax) TweenMax.to(target, 2, {
      yPercent: Math.round(15 + Math.random() * (15 * this.props.blobIntensity)),
      ease: Elastic.easeOut
    })
  }

  touchAntiBlob = ({ target }) => {
    if (this.props.reversed && !this.props.isParallax) TweenMax.to(target, 2, {
      yPercent: Math.round(15 + Math.random() * (15 * this.props.blobIntensity)),
      ease: Elastic.easeOut
    })
  }

  render() {

    const { color, height, isBlob, reversed } = this.props

    return (
      <div className="BlobBackground" ref="Blob" style={{ height }}>

        <div className={`container`}>
          <div
            className={`background  ${reversed ? 'background--reversed' : ''}`}
            style={{ backgroundColor: color }} />

          <div className={`flex blobContainer  ${reversed ? 'blobContainer--reversed' : ''}`} ref="blobContainer">
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color, borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color, borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color, borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchBlob} />
            <div
              className={`blob ${isBlob ? 'shadow' : ''} ${reversed ? 'blob--reversed' : ''}`}
              style={{ backgroundColor: color, borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchBlob} />
          </div>

          <div className={`flex antiBlobContainer ${reversed ? 'antiBlobContainer--reversed' : ''}`} ref="antiBlobContainer">
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              style={{ borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              style={{ borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              style={{ borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchAntiBlob} />
            <div
              className={`antiBlob ${isBlob ? 'shadow' : ''} ${reversed ? 'antiBlob--reversed' : ''}`}
              style={{ borderRadius: window.innerWidth * 6.25 / 100 }}
              onMouseEnter={this.touchAntiBlob} />
          </div>
        </div>

      </div>
    )
  }
}

export default BlobBackground
