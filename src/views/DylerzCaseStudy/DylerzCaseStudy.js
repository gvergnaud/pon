import React, { Component, PropTypes } from 'react'
import './DylerzCaseStudy.scss'
import '../../scss/CaseStudy.scss'
import projects from '../../projects'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'
import 'gsap'
import 'gsap.ScrollToPlugin'

import BlobBackground from '../../components/BlobBackground'
import UIImage from '../../components/UIImage'
import Ripple from '../../components/Ripple'


const project = projects.dylerz
const nextProj = projects.rochard


class DylerzCaseStudy extends Component {

  static contextTypes = {
    setPage: PropTypes.func.isRequired
  }

  state = { blob: false, bottomBlob: false, isRippleAnimated: false }

  componentDidMount() {
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
            if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 20) {
              this.context.setPage(nextProj.path)
            }
          }, 1500)
        })
        .addTo(this.controller)


      const tl = new TimelineMax()
      const { width: computerWidth, height: computerHeight } = this._getComputerStyle()

      tl
        .fromTo(refs.firstTitle, 3, {
          y: -400,
        }, {
          y: 200,
          ease: Power1.easeOut
        }, 'first')
        .to(refs.computer, 5.5, {
          delay: 1.7,
          y: window.innerHeight * 5.8,
          ease: Power0.easeInOut
        }, 'first')
        .to(refs.screen, 5.1, {
          delay: 2,
          y: - (computerWidth * 2894 / 940) + computerHeight * 2.25,
          ease: Power1.easeInOut
        }, 'first')
        .from(refs.eventsimage, 1.2, {
          delay: .3,
          opacity: 0,
          y: 120,
          ease: Power4.easeOut
        }, 'second')
        .staggerFrom('.pictoContainer .picto', .2, {
          delay: .3,
          opacity: 0,
          scale: .5,
          ease: Elastic.easeOut
        }, .03, 'second')
        .from(refs.menuimage, 1.5, {
          delay: .5,
          opacity: 0,
          y: 170,
          ease: Power2.easeInOut
        }, 'second')



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

          TweenMax.set('.Dylerz .info-item', {
            y: 20,
            opacity: 0
          })

          infoTl
            .fromTo(refs.infotitle, .2, {
              y: -10,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
            })
            .staggerFromTo('.Dylerz .info-item', .3, {
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



      // new ScrollMagic.Scene({
      //   triggerElement: refs.events,
      //   offset: - window.innerHeight / 2
      // })
      //  .on('enter', () => {
      //    console.log("aez")
      //    console.log(refs.eventsimage)
      //
      //    TweenMax
      //  })
      //  .addTo(this.controller)
  }

  willAnimateOut(done) {
    done()
  }

  componentWillUnmount() {
    this.controller.destroy()
  }

  _getComputerStyle = () => {

    const imageRatio = 2600 / 1560
    const screenRatio = window.innerWidth / window.innerHeight

    if (imageRatio > screenRatio) {
      return {
        width: window.innerWidth - 50,
        height: (window.innerWidth - 50) * 1560 / 2600
      }
    } else {
      return {
        height: window.innerHeight - 50,
        width: (window.innerHeight - 50) * 2600 / 1560
      }

    }



  }

  render() {
    const { color, title } = project
    const { blob, bottomBlob, isRippleAnimated } = this.state

    return (
      <div className="Dylerz CaseStudy">
        <div className="CaseStudy-blob" ref="topBlob" style={{ height: window.innerHeight * 1 }}>
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

            <h2 className="title" ref="infotitle">dylerz  magazine</h2>

            <div className="infos">
              <article className="info-item">
                <h4 className="info-item-title">Role</h4>
                <p className="info-item-content">ui designer</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">context</h4>
                <p className="info-item-content">startup</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">Device</h4>
                <p className="info-item-content">desktop</p>
                <p className="info-item-content">mobile</p>
              </article>
              <article className="info-item">
                <h4 className="info-item-title">Date</h4>
                <p className="info-item-content">2016</p>
              </article>
            </div>

          </div>

          <p className="description" ref="infodescription">Dylerz is from the DYL agency, the plateform is using to promote urban culture events and news. Dylerz is the Difference You Like. #DYL</p>


          <h1 className="categoryTitle categoryTitle--lowercase" ref="firstTitle">Dylerz<span className="Dylerz-symbol">••<span className="Dylerz-symbolLittle">▼</span></span></h1>

          <section
            ref="showcase"
            className="Dylerz-showCase">

            <div style={{ height: window.innerHeight * 7 }}>
              <div
                ref="computer"
                className="Dylerz-showCase-computer"
                style={this._getComputerStyle()}>
                <div className="Dylerz-showCase-computer-device" />
                <span className="Dylerz-showCase-computer-screenOverflow">
                  <span ref="screen" className="Dylerz-showCase-computer-screenContainer">
                    <UIImage
                      className="Dylerz-showCase-computer-screen"
                      height={2800}
                      width={900}
                      src="/public/assets/images/03_DYLERZ/01_Homepage@2x.jpg" />
                  </span>
                </span>
              </div>
            </div>

            <div
              ref="events"
              className="Dylerz-showCase-events">

              <span
                className="imageContainer"
                ref="eventsimage">
                <UIImage
                  className="image"
                  src="/public/assets/images/03_DYLERZ/02_Menu_Events@2x.png" />
              </span>


              <div ref="eventspicto" className="pictoContainer">
                <div className="picto-row">
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                </div>
                <div className="picto-row">
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                </div>
                <div className="picto-row">
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto triangle">▼</div>
                  <div className="picto">•</div>
                </div>
                <div className="picto-row">
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                  <div className="picto">•</div>
                </div>
                <div className="picto-row">
                  <div className="picto letter">D</div>
                  <div className="picto letter">Y</div>
                  <div className="picto letter">L</div>
                </div>
              </div>

            </div>



          </section>

          <div
            ref="menu"
            className="Dylerz-showCase-menu">

            <span
              ref="menuimage"
              className="imageContainer">
              <UIImage
                className="image"
                height={750}
                width={915}
                src="/public/assets/images/03_DYLERZ/Group 6@2x.png" />
            </span>

          </div>

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
            reversed
            isBlob={bottomBlob}
            color={nextProj.color} />
        </div>

      </div>
    )
  }
}


export default DylerzCaseStudy
