import React, { Component, PropTypes } from 'react'
import './RochardCaseStudy.scss'
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


const project = projects.rochard
const nextProj = projects.jaiye


class RochardCaseStudy extends Component {

  static contextTypes = {
    setPage: PropTypes.func.isRequired,
    setCurrentProject: PropTypes.func.isRequired,
  }

  state = { blob: false, bottomBlob: true, isRippleAnimated: false, isFriendRippleAnimated: false }

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



    /* ----------------------------------------- *
            CaseStudy
    * ----------------------------------------- */

    const tl = new TimelineMax()

    tl
      .fromTo(refs.firstTitle, 3, {
        y: -250,
      }, {
        y: 100,
        ease: Power1.easeOut
      }, 'first')
      // .staggerFrom('.maquette', 1.7, {
      //   y: 250,
      //   ease: Power1.easeOut
      // }, 1.2, 'first')
      .staggerFrom('.label', 1.7, {
        delay: .5,
        yPercent: 350,
        ease: Power1.easeOut
      }, 1.1, 'first')


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

        TweenMax.set('.Rochard .info-item', {
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
          .staggerFromTo('.Rochard .info-item', .3, {
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


    new ScrollMagic.Scene({
      triggerElement: refs.friendRipple
    })
      .on('enter', () => this.setState({ isFriendRippleAnimated: true }))
      .on('leave', () => this.setState({ isFriendRippleAnimated: false }))
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
    const { blob, bottomBlob, isRippleAnimated, isFriendRippleAnimated } = this.state

    return (
      <div className="Rochard CaseStudy">
        <div className="CaseStudy-blob" ref="topBlob" style={{ height: window.innerHeight }}>
          <h1
            className="CaseStudy-title projectTitle"
            style={{ color }}>
            {title}
          </h1>
          <div className="CaseStudy-scrollButton" style={{ color }}>
            scroll
          </div>
          <BlobBackground isBlob={blob} color={color} />
        </div>

        <div className="CaseStudy-container" ref="container">

          <div className="CaseStudy-infoBlock">

            <h2 className="title" ref="infotitle">appartement  rochard</h2>

            <div className="infos">
              <article className="info-item">
                <h4 className="info-item-title">Role</h4>
                <p className="info-item-content">ui designer</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">context</h4>
                <p className="info-item-content">freelance</p>
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

          <p className="description" ref="infodescription">Appartement Rochard is a fresh brand create in Paris by Martin Rochard. The concept of the brand is to highlight the afriacan style with some modern style.</p>


          <h1 className="categoryTitle" ref="firstTitle">ui design</h1>

          <section className="Rochard-showCase firstSection" ref="showcase">
            <div className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/02@2x.png" />
              <h3 className="label" style={{ color }}>lookbook</h3>
            </div>

            <div className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/03@2x.png" />
              <h3 className="label" style={{ color }}>informations</h3>
            </div>

            <div ref="friendRipple" className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/04@2x.png" />
              <h3 className="label" style={{ color }}>amis</h3>
              <Ripple className="Rochard-friendRipple" isAnimated={isFriendRippleAnimated} color={color} />
            </div>

            <div className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/05@2x.png" />
              <h3 className="label" style={{ color }}>parutions</h3>
            </div>

            <div className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/06@2x.png" />
              <h3 className="label" style={{ color }}>distributeur</h3>
            </div>

            <div className="Rochard-showCase-item" style={{ height: window.innerHeight }}>
              <UIImage
                className="maquette odd"
                src="/public/assets/images/01_Appartement_Rochard/07@2x.png" />
              <h3 className="label" style={{ color }}>contact</h3>
            </div>
          </section>

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


export default RochardCaseStudy
