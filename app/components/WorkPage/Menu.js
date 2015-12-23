var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';

var Menu = React.createClass({
  getDefaultProps: function () {
    return {
      categories: []
    }
  },
  getInitialState: function () {
    return {
      showMenu: false,
      activeItem: '',
    }
  },
  controlShow: function () {
    this.setState({showMenu: true});
  },
  handleClose: function () {
    this.setState({showMenu: false});
  },
  changeCategory : function(key, e){
    this.setState({activeItem: key});
    this.props.onChangeCategory(key);
  },
  render: function () {
    var top = this.state.showMenu? 0: '-140px';
    var style = {
      tab: {
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        left: 0,
        top: top,
        zIndex: '9999',
        padding: '27px 0 19px',
        background: '#fff',
        WebkitTransition:'top ease .5s',
        transition: 'top ease .5s',
      },
      ul: {
        overflow: 'hidden',
        width: '76%',
        margin: '0 auto',
      },
      li: {
        padding: '11px 4.8%',
        float: 'left',
      },
      aStyle: {
        fontSize: '1.333333333em',
        color: '#393939',
        display: 'block',
        width: '100%',
        height: '20px',
        lineHeight: '20px',
      },
      aActive: {
        color: '#37b0c9',
        fontSize: '1.333333333em',
        display: 'block',
        width: '100%',
        height: '20px',
        lineHeight: '20px',
      },
      close: {
        position: 'absolute',
        top: 7,
        right: 10,
        width: '30px',
        height: '30px',
        fontSize: 22
      }
    }
    var lis = this.props.categories.map(function (item,key) {
      console.log(item);
      return (
        <li key={key} data-key={item.Id} onClick={this.changeCategory.bind(this, item.Id)} style={style.li}><a style={(item.Id == this.state.activeItem?style.aActive: style.aStyle)}>{item.Name}</a></li>
      )
    }.bind(this));
    return (
      <div className="tab" style={style.tab}>
        <ul style={style.ul}>
          {lis}
        </ul>
        <div 
          style={style.close} 
          onClick={this.handleClose} 
          className="icon close_icon"></div>
      </div>
    );
  }
});

module.exports = Menu;