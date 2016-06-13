import React from 'react';
import { Link } from 'react-router';

import {imgModifier} from '../Tools';
import LazyLoad from 'react-lazy-load';

const WorkIntroGrapherRow = ({data}) => {
  let cover;
  if(data.Cut){
    const cut = JSON.parse(data.Cut);
    cover = data.Cover + cut.w;
  }else{
    cover = imgModifier(data.Cover, "workCover");
  }
  const avatar = imgModifier(data.Photographer.Avatar, "avatar");

  return (
    <div className="workIntroGrapherRow">
      <Link to={`/workDetail/${data.Id}`}>
        <div className="card-work" style={{height: 254/375*innerWidth}}>
          <LazyLoad threshold={100} once>
            <div className="card-price">
              ￥{data.Price} <span className="font_small">/套</span>
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

      <a className="card-head-face" href={`/grapherDetail/${data.UserId}`}>
        <img src={avatar} />
      </a>

      <div className="card-info">
        <p className="info-title">{data.Title}</p>
        <p className="info-Subtitle">有{data.Views}人想拍</p>
      </div>
    </div>
  );
}

export default WorkIntroGrapherRow;
