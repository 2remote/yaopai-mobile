import React from 'react';

import {imgModifier} from '../Tools';

var GrapherIntro = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
       
      }
    };
  },
  render: function() {
    var style = {
      backgroundImage: 'url(imgs/intro-bk.png)',
      textAlign: 'center',
      height: 305-70,
      paddingTop: 70
    };
    let avatarSoruce = this.props.data.User ? avatarSoruce = this.props.data.User.Avatar : null;
    
    let name = '读取中...';
    if ( typeof this.props.data.User != 'undefined'){
      name = this.props.data.User.NickName;
    }

    let cityName = this.props.data.CityName;

    if(this.props.from === 'interview'){
      if(this.props.data.User){
        name = this.props.data.User.NickName;
      };
    };
    const avatar = imgModifier(avatarSoruce, "grapherAvatar");
    return (

      <div ref="grapherIntro"  style={this.props.style || style} className="grapherIntro">
        <img 
          style={{width:98,height:98,marginBottom:13}}
          ref="avatar"
          src={avatar} />
        <div 
          style={{fontSize: '1.3em'}}
          ref="name">{name}</div>
        <span
          className="icon location_icon"
          style={{marginRight:6, marginLeft:-4, fontSize:22}}
          ref="locationIcon" />
        <span
          ref="location">{cityName}</span>
        <div 
          ref="signature">{this.props.data.Signature}</div>
      </div>
    );
  }
});

module.exports = GrapherIntro;