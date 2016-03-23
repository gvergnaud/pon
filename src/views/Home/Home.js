import React, { Component, PropTypes } from 'react'
import projects from '../../projects'
import './Home.scss'
import { mapValues } from '../../utils'
import 'gsap'
import 'gsap.CSSPlugin'
import 'gsap.CSSRulePlugin'
import 'gsap.TextPlugin'

import BlobBackground from '../../components/BlobBackground'
import Ripple from '../../components/Ripple'



const projKeys = Object.keys(projects)


class Home extends Component {

  static propTypes = {

  }

  static contextTypes = {
    setPage: PropTypes.func.isRequired,
    setCurrentProject: PropTypes.func.isRequired,
    getCurrentProject: PropTypes.func.isRequired,
  }

  state = { selectedProj: 'rochard' }

  componentWillMount() {
    const currentProject = this.context.getCurrentProject()
    this.setState({ selectedProj: currentProject ? currentProject.name : 'rochard' })
  }

  componentDidMount() {
    this.context.setCurrentProject(projects[this.state.selectedProj])
    this.willAnimateIn(this)
    window.addEventListener('mousewheel', this.handleScroll)
    window.addEventListener('wheel', this.handleScroll)
    window.addEventListener('DOMMouseScroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedProj !== this.state.selectedProj) {
      this.context.setCurrentProject(projects[this.state.selectedProj])
      this.animateProjectOut(this.refs[prevState.selectedProj], () => {
        this.animateProjectIn(this.refs[this.state.selectedProj])
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('wheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
  }

  willAnimateIn({ refs }) {
    TweenMax.set([refs.jaiye, refs.rochard, refs.dylerz ], { opacity: 0 })
    TweenMax.set([refs.jaiye, refs.rochard, refs.dylerz ].map(x => x.querySelector('.Home-title')), {
      opacity: 0,
      textShadow: "0 0 0 rgba(0,0,0,0)",
      scale: .8,
    })

    TweenMax.fromTo(refs.blob, .8, {
      opacity: 1,
      yPercent: -135,
    }, {
      yPercent: 0,
      ease: Power2.easeIn,
      onComplete: () => this.animateProjectIn(refs[this.state.selectedProj])
    })
  }

  willAnimateOut(done) {
    TweenMax.set(this.refs.wave, { zIndex: 100, opacity: 1, backgroundColor: projects[this.state.selectedProj].color })
    TweenMax.to(this.refs.wave, 1, {
      scale: 5,
      opacity: 0,
      ease: Power3.easeOut,
    })
    TweenMax.to('.Home-goButton', .4, {
      opacity: 0,
      delay: .4,
      ease: Power3.easeInOut,
      onComplete: done
    })
    // this.animateProjectOut(this.refs[this.state.selectedProj])
  }

  animateProjectIn = (project) => {
    const title = project.querySelector('.Home-title')

    const tl = new TimelineMax({ paused: true })

    tl
      .to(project, .2, { opacity: 1 })
      .fromTo(title, 1.2, {
        opacity: 0,
        scale: .95
      }, {
        scale: 1,
        opacity: 1,
        textShadow: "0 5px 10px rgba(0,0,0, .2)",
        ease: Elastic.easeOut.config(1),
        delay: .15
      })

    tl.restart()
  }

  animateProjectOut = (project, done) => {
    const title = project.querySelector('.Home-title')

    const tl = new TimelineMax({ paused: true, onComplete: done })

    tl
      .to(title, .35, {
        scale: .95,
        textShadow: "0px 0px 0px rgba(0,0,0, 0)",
        ease: Back.easeIn.config(4)
      })
      .to(project, .37, {
        opacity: 0
      })

    tl.restart()
  }

  handleScroll = (() => {
    let _thisScroll = 500
    let _lastScroll = 0

    return e => {
      e.preventDefault()
      e.stopPropagation()

      _thisScroll = Date.now()

      if ((_thisScroll - _lastScroll) > 100) this.selectNext()

      _lastScroll = Date.now()
    }

  })()

  selectNext = () => {
    const nextProj = projKeys.reduce((next, proj, i) => {
      if (!next && this.state.selectedProj === proj) return  projKeys[i + 1] || projKeys[0]
      return next
    }, '')

    this.setState({ selectedProj: nextProj })
  }

  selectPrev = () => {
    const prevProj = projKeys.reduce((prev, proj, i) => {
      if (!prev && this.state.selectedProj === proj) return  projKeys[i - 1] || projKeys[projKeys.length - 1]
      return prev
    }, '')

    this.setState({ selectedProj: prevProj })
  }

  handleButtonMouseLeave = (e) => {
    e.target.classList.add('Home-goButton--mouseLeave')
  }

  render() {

    const { selectedProj } = this.state
    const { color: selectedColor } = projects[selectedProj]
    const { setPage } = this.context

    return (
      <div className="Home" ref="element" onClick={this.selectNext}>

        <div ref="blob">
          <BlobBackground color={selectedColor} isBlob />
        </div>

        {mapValues(projects, ({title, path, color}, key) => {
          const isSelected = selectedProj === key
          return (
            <div
              key={key}
              ref={key}
              className={`Home-project ${isSelected ? 'Home-project--selected' : ''}`}>

              <h1
                className={`projectTitle Home-title  ${isSelected ? 'Home-title--selected' : ''}`}
                style={{ color }}>
                {title}
              </h1>

              <Ripple
                delay={true}
                className="Home-ripple"
                isAnimated={isSelected}
                color={color} />

              <div
                className={`Home-goButton ${isSelected ? 'Home-goButton--selected' : ''}`}
                style={{ color }}
                onMouseLeave={this.handleButtonMouseLeave}
                onClick={(e) => {
                  e.stopPropagation()
                  setPage(path)
                }}>
                Go
              </div>

              <Ripple
                infinite={true}
                delay={true}
                className="Home-buttonRipple"
                isAnimated={isSelected}
                color={color} />

            </div>
          )
        })}

        <div ref="wave" className={`Home-wave`} />
      </div>
    )
  }
}


export default Home
