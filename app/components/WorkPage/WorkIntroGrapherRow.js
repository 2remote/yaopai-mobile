import React from 'react';
import { Link } from 'react-router';

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
    const avatar = imgModifier(this.props.data.Photographer.Avatar, "avatar");
    return (
      <div
        style={{width:'100%',color:'#0f0f0f'}}
        className="workIntroGrapherRow">
        <Link to={"/workDetail/" + this.props.data.Id}>
          <div style={{width:'100%',height:254/375*innerWidth,marginBottom: -36,
          backgroundColor:'#eeedeb',position:'relative'}}>
            <LazyLoad threshold={100} once>
              <div style={{background:'rgba(0,0,0,.8)',width:'auto',height:'35px',lineHeight:'35px',color:'white',position:'absolute',bottom:0,left:0,fontSize:'16px',padding:'0 5px',marginBottom:'20px'}}>
                ￥{this.props.data.Price} <span style={{fontSize:'12px'}}>/套</span>
                <div className="top"></div>
                <div className="bottom"></div>
              </div>

              <img
                style={{width:'100%',height:254/375*innerWidth}}
                ref="workImage"
                src={cover}/>
            </LazyLoad>

          </div>
        </Link>
        <Link style={{textAlign:'right',display:'block'}} to={"/grapherDetail/" + this.props.data.UserId}>
        <img
          style={{width:50,height:50,borderRadius:'50%',marginRight:10,marginTop:10,position:'relative'}}
          ref="avatarImage"
          src={avatar}/>
        </Link>
        <div style={{padding:'12px 10px',lineHeight:'24px',marginTop:'-31px',marginBottom:'10px',background:'#fff'}}>
          <p style={{fontSize:'16px',color:'#282828',display:'block',
            whiteSpace:'nowrap', overflow:'hidden',
            textOverflow:'ellipsis',width:'80%'}}>
            {this.props.data.Title}
          </p>
          <p style={{fontSize:'12px',color:'#bebebe'}}>
            有{this.props.data.Views}人想拍
          </p>
        </div>
      </div>
    );
  }
});

export {WorkIntroGrapherRow as default};
