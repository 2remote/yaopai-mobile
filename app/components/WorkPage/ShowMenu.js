var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';
import Menu from './Menu';

var ShowMenu = React.createClass({
  getInitialState: function () {
    return {
      showState: false
    }
  },
  handleClick: function () {
    this.refs.menu.controlShow();
  },
  render: function () {
    var style = {
      position: 'fixed',
      top: '22px',
      right: '22px',
    }
    return (
      <div>
        <div style={style} onClick={this.handleClick}>
          <img 
            src="imgs/workPage/sifting.png"
            srcSet="imgs/workPage/sifting@2X.png 2x" />
        </div>
        <Menu ref="menu" categories={this.props.categories} category={this.props.category} onChangeCategory={this.props.onChangeCategory}/>
      </div>
    );
  }
});

module.exports = ShowMenu;