import React, { Component, PropTypes } from 'react'
import './Loader.scss'
import 'gsap'
import 'gsap-react-plugin'
import images from '../../images'

class Loader extends Component {

  static propTypes = {
    onLoad: PropTypes.func.isRequired
  }

  state = { progress: 0 }

  componentDidMount() {
    this.willAnimateIn(this)

    Promise.all(images.map(src => new Promise((res, rej) => {
      const img = new window.Image()
      img.src = src
      img.onload = res
      img.onerror = rej
    })))
      .then(() => console.log('all loaded!'))
  }

  willAnimateIn({ refs }) {
    TweenMax.to(this, 3, {
      state: { progress: 100 },
      ease: Sine.easeIn,
      onComplete: this.props.onLoad
    })
  }

  willAnimateOut(done) {
    TweenMax.to(this.refs.page, .5, {
      opacity: 0,
      ease: Power3.easeOut,
      onComplete: done
    })
  }


  render() {
    return (
      <div className="Loader" ref="page">

        <div className="Loader-count">{Math.round(this.state.progress)}%</div>
        <div ref="progress" className="Loader-progress" style={{ width: `${this.state.progress}%` }}/>
      </div>
    )
  }
}


export default Loader
