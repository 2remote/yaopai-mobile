import React from 'react';
import { Link } from 'react-router';

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

var WorkIntroGrapherRow = React.createClass({
  render() {
    let cover;
    if(this.props.data.Cut){
      var cut = JSON.parse(this.props.data.Cut);
      cover = this.props.data.Cover + cut.w;
    }else{
      cover = imgModifier(this.props.data.Cover, "workCover");
    }
    const avatar = imgModifier(this.props.data.Photographer.Avatar, "avatar");
    return (
      <div className="workIntroGrapherRow">
        <Link to={"/workDetail/" + this.props.data.Id}>
          <div className="card-work" style={{height: 254/375*innerWidth}}>

            <LazyLoad threshold={100} once>
              <div className="card-price">
                ￥{this.props.data.Price} <span className="font_small">/套</span>
                <div className="triangle-top-left"></div>
                <div className="triangle-bottom-left"></div>
              </div>

              <img
                style={{width:'100%',height:254/375*innerWidth}}
                src={cover}
              />
            </LazyLoad>

          </div>
        </Link>

        <a className="card-head-face" href={`/grapherDetail/${this.props.data.UserId}`}>
          <img src={avatar} />
        </a>

        <div className="card-info">
          <p className="info-title">{this.props.data.Title}</p>
          <p className="info-Subtitle">有{this.props.data.Views}人想拍</p>
        </div>
      </div>
    );
  }
});

export {WorkIntroGrapherRow as default};
