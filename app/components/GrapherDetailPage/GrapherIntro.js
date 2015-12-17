var React = require('react');

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
    const avatar = imgModifier(avatarSoruce, "grapherAvatar");
    return (

      <div ref="grapherIntro"  style={style} className="grapherIntro">
        <img 
          style={{width:98,height:98,marginBottom:13}}
          ref="avatar"
          src={avatar} />
        <div 
          style={{fontSize: '1.3em'}}
          ref="name">{this.props.data.RealName}</div>
        <span
          className="icon location_icon"
          style={{marginRight:6, marginLeft:-4, fontSize:22}}
          ref="locationIcon" />
        <span
          ref="location">{this.props.data.CityName}</span>
      </div>
    );
  }
});

module.exports = GrapherIntro;