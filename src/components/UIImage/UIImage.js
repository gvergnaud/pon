import React, { PropTypes, Component } from 'react'
import styles from './UIImage.scss'


const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
}


class UIImage extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    children: PropTypes.element,
    preLoader: PropTypes.func,
    alt: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    isBoxImage: PropTypes.bool,
    onLoad: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
  }

  state = { status: Status.LOADING }

  componentDidMount() {
    this._createLoader()
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this._createLoader()
    }
  }

  componentWillUnmount() {
    this._destroyLoader()
  }

  _createLoader = () => {
    this._destroyLoader()  // We can only have one loader at a time.

    this.img = new window.Image()
    this.img.onload = this._handleLoad
    this.img.onerror = this._handleError
    this.img.src = this.props.src
  }

  _destroyLoader = () => {
    if (this.img) {
      this.img.onload = null
      this.img.onerror = null
      this.img = null
    }
  }

  _handleLoad = () => {
    if (this.props.onLoad) this.props.onLoad(this.img)
    this._destroyLoader()
    this.setState({ status: Status.LOADED })
  }

  _handleError = () => {
    this._destroyLoader()
    this.setState({ status: Status.FAILED })
  }

  _renderImage = (status) => {
    const { className, style, isBoxImage, alt, src, height, width, children, preLoader } = this.props

    switch (status) {
      case Status.LOADED:
        return (
          <div>
            {isBoxImage ? (
            <div
              className={`UIImage ${className}`}
              style={{
                ...style,
                height,
                width,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
              }} />
          ) : (
            <img className={`UIImage ${className}`} src={src} height={height} width={width} style={style} />
          )}
        </div>
      )


      case Status.LOADING:
        return <div className={className} style={{ height, width, ...style }}>{preLoader ? preLoader() : null}</div>

      case Status.FAILED:
        return <div className={className} style={{ height, width, ...style }}>{children}</div>
    }
  }

  render() {
    return this._renderImage(this.state.status)
  }
}

export default UIImage
