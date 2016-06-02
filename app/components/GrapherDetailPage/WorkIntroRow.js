import React from 'react';
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';

var WorkIntroRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        img: ""
      }
    };
  },
  render: function() {
    const style = {
      price: {
        position: 'absolute',
        right: 20,
        marginTop: 15,
        color: 'white'
      },
      photoAmount: {
        position: 'absolute',
        right: 20,
        bottom: 15,
        color: 'white'
      },
      topMask: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 40,
        background: 'linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%)',
      },
      bottomMask:{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 40,
        marginTop: -46,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%)',
      }
    };
    let cover;
    if(this.props.data.Cut){
      var cut = JSON.parse(this.props.data.Cut);
      cover = this.props.data.Cover + cut.w;
    }else{
      cover = imgModifier(this.props.data.Cover,"workCover");
    }
    return (
      <div className="workIntroRow" style={{width:'100%',height:210/375*innerWidth+80,textAlign:'center'}}>
        <Link to={"/workDetail/" + this.props.data.Id}>
          <div style={style.topMask} />
          <span style={style.price}>{"¥ "+this.props.data.Price}</span>
          <img 
            style={{width:'100%',height:210/375*innerWidth}}
            ref="workImage"
            src={cover} />
          <div style={style.bottomMask}>
            <span style={style.photoAmount} >{this.props.data.Photos.length + " P"}</span>
          </div>
        </Link>
        <span 
          style={{marginBottom:1, color:'green'}}
          ref="workArrow"
          className="icon up_icon" />
        <div
          style={{marginTop:-6}}
          ref="workTitle">{this.props.data.Title}</div>
      </div>
    );
  }
});

export {WorkIntroRow as default};