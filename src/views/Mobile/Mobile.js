import React, { Component, PropTypes } from 'react'
import './Mobile.scss'

import BlobBackground from '../../components/BlobBackground'


class Mobile extends Component {

  static propTypes = {

  }

  componentDidMount() {
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {
    TweenMax.staggerFromTo('.Mobile-content p, .Mobile-content li', .3, {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      delay: .7,
      ease: Power2.easeOut
    }, .2)
  }

  render() {
    return (
      <div className="Mobile" ref="element">
        <div className="Mobile-blobContainer">
          <BlobBackground color={'#FFB400'} isBlob blobIntensity={0.1} />
        </div>

        <div className="Mobile-content">
          <p>My name is Pon…</p>
          <p>
            ... a 24 years old french interactive designer. I’m actually based in Paris and currently in 4th year at HETIC. 
            <br />
            If your heard some good news, I’m looking for a 6 months internship as a <strong>interactive designer</strong> somewhere in the world.
          </p>

          <ul className="Mobile-social">
            <li><a target="_blank" href="mailto:michael.ponrajah@hetic.net">Email</a></li>
            <li><a target="_blank" href="https://pinterest.com">Pinterest</a></li>
            <li><a target="_blank" href="https://linkedin.com">LinkedIn</a></li>
            <li><a target="_blank" href="https://instagram.com">Instagram</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


export default Mobile
