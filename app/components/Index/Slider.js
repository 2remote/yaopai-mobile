import React from 'react';
import Slick from 'react-slick';

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
    imgs: [{
      src: "http://7xlxnz.com1.z0.glb.clouddn.com/interview/2875d31f-fdaa-4bba-8322-9324e37b7bb7.jpg?imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x400a0a80/interlace/1",
      url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208614841&idx=1&sn=836f0d5ee6dfe2faffb8e1b050224cdc"
    }, {
      src: "http://7xlxnz.com1.z0.glb.clouddn.com/interview/2875d31f-fdaa-4bba-8322-9324e37b7bb7.jpg?imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x400a0a80/interlace/1",
      url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208598870&idx=1&sn=431cf10eccd393d158a862b8df936c1a"
    }, {
      src: "http://7xlxnz.com1.z0.glb.clouddn.com/interview/2875d31f-fdaa-4bba-8322-9324e37b7bb7.jpg?imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x400a0a80/interlace/1",
      url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208321425&idx=1&sn=ca3c63684cd62f5477fc82b575d795f2"
    }, ]
  }

  render() {
    let ImgNodes = this.props.imgs.map(function(img, i){
      return (
        <div>
          <a href={img.url} >
            <img 
              src={img.src} 
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