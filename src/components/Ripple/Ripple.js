import React, { Component, PropTypes } from 'react'
import './Ripple.scss'

class Ripple extends Component {

  static propTypes = {
    isAnimated: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.string,
    delay: PropTypes.bool,
    infinite: PropTypes.bool,
  }

  render() {
    const { delay, infinite, isAnimated, style, className, color } = this.props
    return (
      <div className={`Ripple ${className}`} style={style}>
        <div className={` Ripple-wave first ${delay ? 'delay' : ''} ${infinite ? 'infinite' : ''} ${isAnimated ? 'Ripple-wave--animated' : ''}`} />
        <div className={` Ripple-wave second ${delay ? 'delay' : ''} ${infinite ? 'infinite' : ''} ${isAnimated ? 'Ripple-wave--animated' : ''}`} />
        <div className={`Ripple-wave third ${delay ? 'delay' : ''} ${infinite ? 'infinite' : ''} ${isAnimated ? 'Ripple-wave--animated' : ''}`} />
      </div>
    )
  }
}


export default Ripple
