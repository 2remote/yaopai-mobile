import React from 'react';
import Slick from 'react-slick';
import {imgModifier, actionLinkMaker } from '../Tools'

const settings = {
  initialSlide: 0,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4500,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true
};


export default class Slider extends React.Component {
  static defaultProps = {
    works: []
  }

  render() {
    let works = this.props.works.filter(function(item,i){
      return item.Position == 'HomeSlide'
    })
    let ImgNodes = works.map(function(work, i){
      var extraId = work.ExtraId;

      var url = work.Url;
      if (work.Action !== 'Link'){
        url = "#" + actionLinkMaker(work.Action, work.ExtraId);
      }
      return (
        <div key={i}>
          <a href={url} >
            <img 
              src={imgModifier(work.Image,'ad')}
              style={{width:'100%',height:210/375*innerWidth}} />
          </a>
        </div>
      ); 
    });

    return (
      <Slick {...settings}>
        {ImgNodes}
      </Slick>
    );
  }
}