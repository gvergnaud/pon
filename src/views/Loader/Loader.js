import React, { Component, PropTypes } from 'react'


class Loader extends Component {

  static contextTypes = {
    setPage: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.willAnimateIn(this)
  }

  willAnimateIn({ refs }) {
  }

  willAnimateOut(done) {
    done()
  }

  render() {
    return (
      <div className="Loader">

      </div>
    )
  }
}


export default Loader
