import React from 'react'
import $ from 'jquery'

var Toaster = React.createClass({
  displayName: 'ReactToaster',
  getInitialState: function () {
    return {
      display: 'none',
      content: '',
      top: '-200px'
    }
  },
  getDefaultProps: function() {
    return {
      duration: 3000,
      bottom:false,
      css:{}
    }
  },
  timeId:false,
  componentDidUpdate: function () {
    if (this.state.display == 'block') {
      this.timeId = setTimeout(function () {
        this.hide()
        this.timeId = false
      }.bind(this), this.props.duration)
    }
  },
  componentWillUnmount () {
    this.timeId && clearTimeout(this.timeId)
  },
  show: function (content) {
    this.setState({display: 'block', content: content, top: 0})
    this.refs.displayCtrl.style.display = 'block'
    this.props.isWorkPage ? $("#app").offset({top: 0, left:0}) : $("#app").offset({top: 0, left:0})
  },
  hide: function () {
    if (this.state.display == 'block') {
      this.timeId && clearTimeout(this.timeId)
      this.timeId = false
      setTimeout(function () {
        this.setState({display: 'none', content: '', top: '-200px'})
        this.refs.displayCtrl.style.display = 'none'
        $("#app").offset({top: 0, left:0}).css("top","0")
      }.bind(this), 200)
    }
  },
  render: function () {
    var styles = {
      position: 'fixed',
      zIndex: 99,
      width: '100%',
      top: this.state.top,
      padding: '15px 0',
      background: 'rgba(0,0,0,0.8)',
      textAlign: 'center',
      color: '#fff',
      lineHeight : '1em',
      fontSize: '14px',
      WebkitTransition:'all ease 1s',
      transition: 'all ease 1s'
    }
    if (this.props.bottom) {
      styles.top = undefined
      styles.display = 'none'
      styles.bottom = 0
    }
    if (this.props.css) {
      var css = this.props.css
      for (var p in css) {
        styles[p] = css[p]
      }
    }
    return (
      <div ref="displayCtrl" style={styles}>
        {this.state.content}
      </div>
    )
  }
})

export {Toaster as default}
