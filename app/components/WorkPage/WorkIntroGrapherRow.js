import React from 'react';
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

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
    let cover;
    if(this.props.data.Cut){
      var cut = JSON.parse(this.props.data.Cut);
      cover = this.props.data.Cover + cut.w;
    }else{
      cover = imgModifier(this.props.data.Cover, "workCover");
    }
    const avatar = imgModifier(this.props.data.User.Avatar, "avatar");
    return (
      <div 
        style={{width:'100%',textAlign:'center',color:'#0f0f0f'}}
        className="workIntroGrapherRow">
        <Link to={"/workDetail/" + this.props.data.Id}>
          <div style={{width:'100%',height:210/375*innerWidth,marginBottom: -36,backgroundColor:'#eeedeb'}}>
            <LazyLoad threshold={100} once>
              <img
                style={{width:'100%',height:210/375*innerWidth}}
                ref="workImage"
                src={cover}/>
            </LazyLoad>
          </div>
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

export {WorkIntroGrapherRow as default};
