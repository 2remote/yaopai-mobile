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
  componentDidUpdate: function () {
    if (this.state.display == 'block') {
      setTimeout(function () {
        this.hide();
      }.bind(this), 1000)
    }
  },
  show: function (content) {
    this.setState({display: 'block', content: content, top: 0
    });
  },
  hide: function () {
    setTimeout(function () {
      this.setState({display: 'none', content: '', top: '-200px'
      });
    }.bind(this), 1000)
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
      var css = this.props.css
      for (var p in css) {
        styles[p] = css[p];
      }
    }
    return (
      <div style={styles}>
        {this.state.content}
      </div>
    )
  }
});

module.exports = Toaster;