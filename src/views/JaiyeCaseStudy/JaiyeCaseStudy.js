import React, { Component, PropTypes } from 'react'
import './JaiyeCaseStudy.scss'
import '../../scss/CaseStudy.scss'
import projects from '../../projects'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'
import 'gsap'
import 'gsap.ScrollToPlugin'
import { getDocumentHeight, getScrollTop } from '../../utils'

import BlobBackground from '../../components/BlobBackground'
import UIImage from '../../components/UIImage'
import Ripple from '../../components/Ripple'


const project = projects.jaiye
const nextProj = projects.dylerz


class JaiyeCaseStudy extends Component {

  static contextTypes = {
    setPage: PropTypes.func.isRequired,
    setCurrentProject: PropTypes.func.isRequired,
  }

  state = { blob: false, bottomBlob: true, isRippleAnimated: false }

  componentDidMount() {
    this.context.setCurrentProject(project)
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {

    // scroll
    TweenMax.fromTo(window, 1, {
      scrollTo: { y: 0 },
      ease: Power4.easeInOut
    }, {
      scrollTo: { y: window.innerHeight * 1.2 },
      ease: Power4.easeInOut
    })

    this.controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave"
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



    // new ScrollMagic.Scene({
    //   triggerElement: refs.topBlob,
    //   offset: 20,
    // })
    //   .on('leave', () => setTimeout(() => {
    //     if (document.body.scrollTop < 20) this.context.setPage('/')
    //   }, 1500))
    //   .addTo(this.controller)


    new ScrollMagic.Scene({
      triggerElement: refs.bottomBlob,
      offset: window.innerHeight / 2
    })
      .on('start', () => {
        TweenMax.fromTo(refs.bottomTitle, 1.2, {
          opacity: 0,
          scale: .95,
          textShadow: "0 0 0 rgba(0,0,0, 0)",
        }, {
          scale: 1,
          opacity: 1,
          textShadow: "0 5px 10px rgba(0,0,0, .25)",
          ease: Elastic.easeOut.config(1),
          delay: .15
        })

        this.setState({ isRippleAnimated: true })

        setTimeout(() => {
          if (getScrollTop() + window.innerHeight > getDocumentHeight() - 20) {
            this.context.setPage(nextProj.path)
          }
        }, 1500)
      })
      .addTo(this.controller)


    const tl = new TimelineMax()

    tl
      .to(refs.firstTitle, 2, {
        y: 30,
        ease: Power1.easeOut
      }, 'first')
      .to(refs.subtitle, 2, {
        delay: 1,
        y: 100,
        ease: Power1.easeOut
      }, 'first')
      .staggerFrom('.firstSection .wireframe', 1.7, {
        delay: .7,
        y: 250,
        ease: Power1.easeOut
      }, .5, 'first')
      .staggerFrom('.firstSection .wireframe.odd', 1, {
        delay: 1,
        rotation: 12,
        ease: Power1.easeOut
      }, 1, 'first')
      .staggerFrom('.firstSection .wireframe.even', 1, {
        delay: 1.5,
        rotation: -12,
        ease: Power1.easeOut
      }, 1, 'first')
      .staggerFrom('.firstSection .label', 2, {
        delay: .5,
        y: 450,
        ease: Power1.easeOut
      }, .57, 'first')

    new ScrollMagic.Scene({
      triggerElement: refs.container,
      offset: - window.innerHeight,
      duration: tl.totalDuration() * window.innerHeight,
    })
      .setTween(tl)
      .on('enter', () => {
        const infoTl = new TimelineMax()

        TweenMax.set(refs.infotitle, {
          y: 20,
          opacity: 0
        })

        TweenMax.set('.Jaiye .info-item', {
          y: 20,
          opacity: 0
        })

        infoTl
          .fromTo(refs.infotitle, .2, {
            y: 20,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            delay: .5,
          })
          .staggerFromTo('.Jaiye .info-item', .3, {
            y: 20,
            opacity: 0
          }, {
            y: 0,
            opacity: 1
          }, .1)
          .fromTo(refs.infodescription, .4, {
            y: 20,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            delay: .5,
          })

      })
      .addTo(this.controller)


    const secondTl = new TimelineMax()
    secondTl
      .fromTo(refs.secondTitle, 2.3, {
        y: -700,
      }, {
        y: -300,
        ease: Power1.easeOut
      }, 'second')
      .staggerFrom('.secondSection .wireframe', 1.7, {
        delay: .2,
        y: 250,
        ease: Power1.easeOut
      }, 1.2, 'second')
      .staggerFrom('.secondSection .wireframe.odd', 1, {
        delay: .6,
        rotation: 10,
        ease: Power1.easeOut
      }, 1.1, 'second')
      .staggerFrom('.secondSection .wireframe.even', 1, {
        delay: 1.25,
        rotation: -10,
        ease: Power1.easeOut
      }, 1, 'second')


    new ScrollMagic.Scene({
      triggerElement: refs.secondSection,
      offset: - window.innerHeight * 1.5,
      duration: secondTl.totalDuration() * window.innerHeight,
    })
      .setTween(secondTl)
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
    const { blob, bottomBlob, isRippleAnimated } = this.state

    return (
      <div className="Jaiye CaseStudy">
        <div className="CaseStudy-blob" ref="topBlob" style={{ height: window.innerHeight }}>
          <h1
            className="CaseStudy-title projectTitle"
            style={{ color }}>
            {title}
          </h1>
          <div className="CaseStudy-scrollButton">
            scroll
          </div>
          <BlobBackground isBlob={blob} color={color} />
        </div>

        <div className="CaseStudy-container" ref="container">

          <div className="CaseStudy-infoBlock">

            <h2 className="title" ref="infotitle">Jaiye Music App</h2>

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

          <p className="description" ref="infodescription">Jaiye, is the first musical streaming service dedicated to Afro sounds. <br />
            Entertain people by providing a unique African music platform is the goal of the application.</p>


          <h1 className="categoryTitle" ref="firstTitle">ux design</h1>

          <h3 className="sectionTitle" ref="subtitle" style={{ color }}>
            wireframes
          </h3>

          <section className="Jaiye-showCase firstSection" ref="showcase">
            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe odd"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/01@2x.png" />
              <h3 className="label" style={{ color }}>Login Screen</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe even"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/02@2x.png" />
              <h3 className="label" style={{ color }}>Registration tunnel</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe odd"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/03@2x.png" />
              <h3 className="label" style={{ color }}>My playlist</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe even"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/04@2x.png" />
              <h3 className="label" style={{ color }}>Artist view</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe odd"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/05@2x.png" />
              <h3 className="label" style={{ color }}>Album view</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe even"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/06@2x.png" />
              <h3 className="label" style={{ color }}>Album on scroll view</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe odd"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/07@2x.png" />
              <h3 className="label" style={{ color }}>Search view</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe even"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/08@2x.png" />
              <h3 className="label" style={{ color }}>Player view</h3>
            </div>

            <div className="Jaiye-showCase-item">
              <UIImage
                style={{ borderRadius: window.innerHeight * 0.064 }}
                className="wireframe odd"
                height={window.innerHeight * .85}
                src="/public/assets/images/02_Jaiye/09@2x.png" />
              <h3 className="label" style={{ color }}>Option view</h3>
            </div>
          </section>

          <h1 className="categoryTitle" ref="secondTitle">ui design</h1>

          <span ref="secondSection">
            <section className="Jaiye-showCase secondSection">
              <div className="Jaiye-showCase-item">
                <UIImage
                  style={{ borderRadius: window.innerHeight * 0.064 }}
                  className="wireframe wireframe--black odd"
                  height={window.innerHeight * .85}
                  src="/public/assets/images/02_Jaiye/10@2x.png" />
              </div>

              <div className="Jaiye-showCase-item">
                <UIImage
                  style={{ borderRadius: window.innerHeight * 0.064 }}
                  className="wireframe wireframe--black even"
                  height={window.innerHeight * .85}
                  src="/public/assets/images/02_Jaiye/11@2x.png" />
              </div>

              <div className="Jaiye-showCase-item">
                <UIImage
                  style={{ borderRadius: window.innerHeight * 0.064 }}
                  className="wireframe wireframe--black odd"
                  height={window.innerHeight * .85}
                  src="/public/assets/images/02_Jaiye/12@2x.png" />
              </div>

              <div className="Jaiye-showCase-item">
                <UIImage
                  style={{ borderRadius: window.innerHeight * 0.064 }}
                  className="wireframe wireframe--black even"
                  height={window.innerHeight * .85}
                  src="/public/assets/images/02_Jaiye/13@2x.png" />
              </div>
            </section>
          </span>

        </div>

        <div className="CaseStudy-blob" ref="bottomBlob" style={{ height: window.innerHeight }}>
          <h1
            ref="bottomTitle"
            className="CaseStudy-title CaseStudy-title--bottom projectTitle"
            style={{ color: nextProj.color }}>
            {nextProj.title}
          </h1>
          <Ripple className="CaseStudy-blobRipple" isAnimated={isRippleAnimated} color={color} />
          <BlobBackground
            isParallax
            reversed
            isBlob={bottomBlob}
            color={nextProj.color} />
        </div>

      </div>
    )
  }
}


export default JaiyeCaseStudy
