import React, { Component, PropTypes } from 'react'
import './JaiyeCaseStudy.scss'
import '../../scss/CaseStudy.scss'
import projects from '../../projects'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'
import 'gsap'
import 'gsap.ScrollToPlugin'

import BlobBackground from '../../components/BlobBackground'


const project = projects.jaiye
const nextProj = projects.dylerz


class JaiyeCaseStudy extends Component {

  static contextTypes = {
    setPage: PropTypes.func.isRequired
  }

  state = { blob: false, bottomBlob: false }

  componentDidMount() {
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {

    // scroll
    TweenMax.to(window, 1, {
      scrollTo: { y: window.innerHeight },
      ease: Power4.easeInOut
    })

    this.controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
      }
    })



    new ScrollMagic.Scene({
      triggerElement: refs.topBlob,
      offset: window.innerHeight * .3,
    })
      .on('enter', () => this.setState({ blob: true }))
      .addTo(this.controller)

    new ScrollMagic.Scene({
      triggerElement: refs.bottomBlob,
      offset: - window.innerHeight * .8,
    })
      .on('enter', () => this.setState({ bottomBlob: true }))
      .addTo(this.controller)

    new ScrollMagic.Scene({
      triggerElement: refs.topBlob,
      offset: 20,
    })
      .on('leave', () => setTimeout(() => {
        console.log(document.body.scrollTop)
        if (document.body.scrollTop < 20) this.context.setPage('/')
      }, 1500))
      .addTo(this.controller)

    const tl = new TimelineMax()

    tl
      .to(refs.firstTitle, 2, {
        y: -50,
        ease: Power1.easeOut
      }, 'first')
      .staggerFrom('.firstSection .wireframe', 1.7, {
        delay: .7,
        y: 350,
        ease: Power1.easeOut
      }, .5, 'first')
      .to(refs.secondTitle, 1, {
        y: -50,
        ease: Power1.easeOut
      }, 'second')
      .staggerFrom('.secondSection .wireframe', 2, {
        delay: .2,
        y: 350,
        ease: Power1.easeOut
      }, .6, 'second')

    new ScrollMagic.Scene({
      triggerElement: refs.container,
      offset: - window.innerHeight,
      duration: tl.totalDuration() * window.innerHeight,
    })
      .setTween(tl)
      .addIndicators()
      .addTo(this.controller)
  }

  willAnimateOut(done) {
    done()
  }

  componentWillUnmount() {
    this.controller.destroy()
  }

  render() {

    const { color, title } = project
    const { blob, bottomBlob } = this.state

    return (
      <div className="Jaiye CaseStudy">
        <div className="CaseStudy-blob" ref="topBlob" style={{ height: window.innerHeight }}>
          <h1
            className="CaseStudy-title projectTitle"
            style={{ color }}>
            {title}
          </h1>
          <BlobBackground isBlob={blob} color={color} />
        </div>

        <div className="CaseStudy-container" ref="container">

          <div className="CaseStudy-infoBlock">

            <h2 className="title">Jaiye Music App</h2>

            <div className="infos">
              <article className="info-item">
                <h4 className="info-item-title">Role</h4>
                <p className="info-item-content">ux designer</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">context</h4>
                <p className="info-item-content">startup</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">Device</h4>
                <p className="info-item-content">mobile</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">Date</h4>
                <p className="info-item-content">2016</p>
              </article>
            </div>

          </div>

          <p className="description">Jaiye, is the first musical streaming service dedicated to Afro sounds. <br />
            Entertain people by providing a unique African music platform is the goal of the application.</p>


          <h1 className="categoryTitle" ref="firstTitle">ux design</h1>

          <section className="Jaiye-showCase firstSection" ref="showcase">
            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>
          </section>

          <h1 className="categoryTitle" ref="secondTitle">ui design</h1>

          <section className="Jaiye-showCase secondSection" ref="showcase">
            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <img className="wireframe" height="700" width="335" src="http://lorempixel.com/335/700" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>
          </section>

        </div>

        <div className="CaseStudy-blob" ref="bottomBlob" style={{ height: window.innerHeight }}>
          <h1
            className="CaseStudy-title CaseStudy-title--bottom projectTitle"
            style={{ color: nextProj.color }}>
            {nextProj.title}
          </h1>
          <BlobBackground
            reversed
            isBlob={bottomBlob}
            color={nextProj.color} />
        </div>

      </div>
    )
  }
}


export default JaiyeCaseStudy
