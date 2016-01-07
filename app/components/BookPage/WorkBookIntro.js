var React = require('react');
const $ = require('jquery');

import { GET_WORK_INTRO, imgModifier } from '../Tools';

var BookIntro = React.createClass({

  getDefaultProps: function() {
    return {
      photographer:[]
    };
  },

  render: function() {
    return (
      <div 
        style={{
          paddingTop: 15,
          backgroundImage: 'url(imgs/bookIntroBg.png)',
          height: 140,
          width: '87.2%',
          margin: '0 auto 18px'
        }}
        className="bookIntro">
        <span ref="currentTitle" >当前订单</span>
        <div 
          style={{margin: '-25px 0 19px'}}
          className="splitLine" >
          <img
          src="imgs/common/spliter-line.png"
          srcSet="imgs/common/spliter-line@2X.png 2x" />
        </div>
        <img 
          style={{width:52}}
          ref="grapherAvatar"
          src={imgModifier(this.props.albums?this.props.albums.Cover:this.props.photographer.Avatar, "avatar")} />
        <div ref="grapherName">{this.props.albums?this.props.albums.Title:this.props.photographer.NickName}</div>
      </div>
    );
  }
});

module.exports = BookIntro;