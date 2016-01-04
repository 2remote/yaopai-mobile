var React = require('react');
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
  },
  render: function () {
    var style = {
      position: 'fixed',
      top: '22px',
      right: '22px',
      zIndex: '99',
    }
    return (
      <div>
        <div style={style} onClick={this.handleClick}>
          <span
            className="icon filter_icon" 
            style={{fontSize:25, backgroundColor:'black', color:'white', padding:'10'}} />
        </div>
        <TagMenu ref="tagMenu" cities={this.props.cities} catas={this.props.catas} />
      </div>
    );
  }
});

module.exports = ShowMenu;