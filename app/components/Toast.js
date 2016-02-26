import React from 'react';

var Toaster = React.createClass({
  displayName: 'ReactToaster',
  getInitialState: function () {
    return {
      display: 'none',
      content: '',
      top: '-200px',
    }
  },
  getDefaultProps: function() {
    return {
      duration: 1000
    };
  },
  timeId:false,
  componentDidUpdate: function () {
    if (this.state.display == 'block') {
      this.timeId = setTimeout(function () {
        this.hide();
        this.timeId = false;
      }.bind(this), this.props.duration);
    }
  },
  componentWillUnmount () {
    this.timeId && clearTimeout(this.timeId);
  },
  show: function (content) {
    this.setState({display: 'block', content: content, top: 0
    });
  },
  hide: function () {
    if (this.state.display == 'block') {
      this.timeId && clearTimeout(this.timeId);
      this.timeId = false
      setTimeout(function () {
        this.setState({display: 'none', content: '', top: '-200px'})
      }.bind(this), 1000)
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
      transition: 'all ease 1s',
    };
    if (this.props.css) {
      styles.top    = undefined;
      styles.bottom = 0;
    }
    return (
      <div style={styles}>
        {this.state.content}
      </div>
    )
  }
});

module.exports = Toaster;