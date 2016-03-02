import React from 'react';
import {Link} from 'react-router';
import {imgModifier} from '../Tools';

var GrapherAvatar = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        
      }
    };
  },

  render: function() {
    const avatar = this.props.data?imgModifier(this.props.data.Avatar, 'avatar'):'';

    return (
      <div 
        style={{textAlign:'center',margin:0,width:'100%'}}
        className="grapherAvatar">
        <Link style={{lineHeight:'inherit'}} to={"/grapherDetail/" + this.props.data.Id}>
        <img 
          style={{width:52,height:52}}
          ref="grapherIcon"
          src={avatar}/>
        <div
          style={{fontSize:'1.334em',margin:'2px 0 20px'}}
          ref="grapherNick">{this.props.data?this.props.data.NickName:''}</div>
        </Link>
      </div>
    );
  }
});

module.exports = GrapherAvatar;
