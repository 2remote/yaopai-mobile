var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';

var ReactSwipe = require('react-swipe');
var DocumentTitle = require('react-document-title');
var UserActions = require('../../actions/UserActions');
var PhotographerActions = require('../../actions/PhotographerActions');
var PhotographerStore = require('../../stores/PhotographerStore');
var AdActions = require('../../actions/AdActions');
var AdStore = require('../../stores/AdStore');
require('./index.css');

var HamburgMenu = require('../HamburgMenu');
var ImageBoxLine = require('./ImageBoxLine');
var ImageVerticalGrid = require('./ImageVerticalGrid');

var Index = React.createClass({
  mixins : [
    Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'),
    Reflux.listenTo(AdStore,'_onAdStoreChange'),
  ],
  getDefaultProps: function() {
    return {
      imgs: [
        { src: "slider-furui.jpg", 
          srcset: "slider-furui.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208614841&idx=1&sn=836f0d5ee6dfe2faffb8e1b050224cdc" },  
        {
          src: "slider-hedaxun.gif", 
          srcset: "slider-hedaxun.gif 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208598870&idx=1&sn=431cf10eccd393d158a862b8df936c1a" },  
        { 
          src: "slider-jiran.jpg", 
          srcset: "slider-jiran.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208321425&idx=1&sn=ca3c63684cd62f5477fc82b575d795f2" },  
        {
          src: "slider-xiaoweixuezhang.jpg", 
          srcset: "slider-xiaoweixuezhang.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208744868&idx=2&sn=be7d83600a079a70bbb266d23b7f09df" },
        {
          src: "slider-yexiaokui.jpg", 
          srcset: "slider-yexiaokui.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208697675&idx=1&sn=7b4ad41ae6d6d659b9b79fe6505ce244" }
      ]
    };
  },
  getInitialState: function() {
    return {
      currentSlider: 0,
      userData : {},
      recommendGraphers : [],
      recommendWorks : [],
      adWorks:[]
    };
  },
  componentDidMount : function () {
    UserActions.currentUser();
    //得到推荐摄影师
    PhotographerActions.recommendList();

    // 获得Ad 
    AdActions.list();
  },

  _onAdStoreChange : function (data) {
    console.log('_onAdStoreChange.data', data);
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({adWorks : data.workList});
      }
    }
  },
  _onPhotographerStoreChange : function(data){
    if(data.flag == 'recommendList'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({recommendGraphers : data.photographers});
      }
    }
  },
  updateSliderButtons: function(position){
    // console.log(position);
    this.setState({currentSlider: position});
  },

  autoNextPageOnSwiped: function(index, elem){
    // console.log("to next page",this);
  },

  render: function() {
    var ImgNodes = this.props.imgs.map(function(img, i){
      return (
        <div>
          <a href={img.url} >
            <img 
              src={"imgs/indexPage/" + img.src} 
              srcSet={"imgs/indexPage/" + img.srcset} 
              width="100%" />
          </a>
        </div>
      ); 
    });

    var currentSlider = this.state.currentSlider;
    var sliderButtons = this.props.imgs.map(function(img, i){
      if (i == currentSlider){
        return ( 
          <img className="currentCarousel" 
            src="imgs/indexPage/current-carousel.png"
            srcSet="imgs/indexPage/current-carousel@2X.png 2x" />
          );
      } else {
        return (
          <img 
            src="imgs/indexPage/normal-carousel.png"
            srcSet="imgs/indexPage/normal-carousel@2X.png 2x" />
        );  
      }
      
    });
    return (
      <DocumentTitle title="YAOPAI：一个全球预约摄影师平台">
      <div className="index">
        <HamburgMenu />
      
        <div className="indexContent">
          <div className="spliterWork" >
              <img src="imgs/indexPage/icon-works.png"
                srcSet="imgs/indexPage/icon-works@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>作品</div>
                <div>WORKS</div>
              </div>
          </div>

          <ImageBoxLine filter={"HomeAlbums"} number={12} picsInRow={4} works={this.state.adWorks} />

          <div className="spliterGrapher" >
              <img 
                src="imgs/indexPage/icon-grapher.png"
                srcSet="imgs/indexPage/icon-grapher@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>摄影师</div>
                <div>PHOTOGRAPHER</div>
              </div>
          </div>

          <ImageVerticalGrid works={this.state.recommendGraphers}/>

          <div className="spliterInterview" >
            <img 
              src="imgs/indexPage/icon-interview.png"
              srcSet="imgs/indexPage/icon-interview@2X.png 2x" />
            <div className="splitLine" >
              <img 
                src="imgs/common/spliter-line.png"
                srcSet="imgs/common/spliter-line@2X.png 2x" />
            </div>
            <div className="splitContent">
              <div>访谈</div>
              <div>INTERVIEW</div>
            </div>
          </div>
        
          <ImageBoxLine filter={"HomeInterview"} number={6} picsInRow={3} works={this.state.adWorks} />

        </div>

      </div>
      </DocumentTitle>
      );
  }
});

module.exports = Index;
