import React from 'react';
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';
import TagMenu from './TagMenu';

var ShowMenu = React.createClass({
  getInitialState: function () {
    return {
      showState: false
    }
  },
  handleClick: function () {
    this.refs.tagMenu.toggle();
    this.setState({showState: !this.state.showState});
  },
  render: function () {
    var transform = this.state.showState ? 'scaleY(-1)' : 'none';
    var style = {
      position: 'fixed',
      top: 5,
      right: '22px',
      zIndex: '99',
      transform: transform,
      WebkitTransform: transform,
      transition: '1s',
      WebkitTransition: '1s',
    };

    return (
      <div>
        <div style={style} onClick={this.handleClick}>
          <span
            className="icon filter_icon" 
            style={{fontSize:25, backgroundColor:'black', padding:'10', color: 'white'}} />
        </div>
        <TagMenu ref="tagMenu" 
          cities={this.props.cities} 
          catas={this.props.catas} 
          onSelectedTag={this.props.onSelectedTag} />
      </div>
    );
  }
});

module.exports = ShowMenu;