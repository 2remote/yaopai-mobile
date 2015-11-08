var React = require('react');
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';

var WorkIntroGrapherRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        Cover: "imgs/default/work1.jpg",
        User: {
          NickName: "Ma Xiaochi",
          Avatar: "imgs/default/maxiaochi.jpg"
        },
        Title: "可以拍摄的水果",
        Id: 1
      }
    };
  },
  render: function() {

    const cover = imgModifier(this.props.data.Cover, "workCover");
    const avatar = imgModifier(this.props.data.User.Avatar, "avatar");
    return (
      <div 
        style={{width:'100%',textAlign:'center',color:'#0f0f0f'}}
        className="workIntroGrapherRow">
        <Link to={"/workDetail/" + this.props.data.Id}>
          <img
            style={{width:'100%',height:260/375*innerWidth,marginBottom: -36}}
            ref="workImage"
            src={cover}/>
        </Link>
        <Link style={{lineHeight:'inherit'}} to={"/grapherDetail/" + this.props.data.User.Id}>
        <img
          style={{width:52,height:52}}
          ref="avatarImage"
          src={avatar}/>
        <div
          ref="avatarNick">{this.props.data.User.NickName}</div>
        </Link>
        <div
          style={{fontSize:'1.667em',margin:'3px 0 21px'}}
          ref="workTitle">“ {this.props.data.Title} ”</div>
      </div>
    );
  }
});

module.exports = WorkIntroGrapherRow;
