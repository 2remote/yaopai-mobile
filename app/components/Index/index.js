import React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';

import ReactSwipe from 'react-swipe';
import DocumentTitle from 'react-document-title';
import UserActions from '../../actions/UserActions';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';
import AdActions from '../../actions/AdActions';
import AdStore from '../../stores/AdStore';
import './index.scss';
import { TITLE } from '../Tools';

import HamburgMenu from '../HamburgMenu';
import ImageBoxGrid from './ImageBoxGrid';
import Slider from './Slider';
import WechatShare from '../Weixin/WechatShare';

var Index = React.createClass({
  mixins : [
    Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'),
    Reflux.listenTo(AdStore,'_onAdStoreChange')
  ],
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

  render: function() {
    return (
      <DocumentTitle title={TITLE.indexPage}>
      <div className="text_center">
        <HamburgMenu />

        <Slider works={this.state.adWorks} />

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

          <ImageBoxGrid filter={"HomeAlbums"} cols={4} rows={3} works={this.state.adWorks} />

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

          <ImageBoxGrid filter={"HomeGrapher"} cols={4} rows={1} works={this.state.adWorks} />

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

          <ImageBoxGrid filter={"HomeInterview"} cols={3} rows={2} works={this.state.adWorks} />

          <div className="spliterActivity" >
            <img
              src="imgs/indexPage/icon-activity.png"
              srcSet="imgs/indexPage/icon-activity@2X.png 2x" />
            <div className="splitLine" >
              <img
                src="imgs/common/spliter-line.png"
                srcSet="imgs/common/spliter-line@2X.png 2x" />
            </div>
            <div className="splitContent">
              <div>活动</div>
              <div>ACTIVITY</div>
            </div>
          </div>

          <ImageBoxGrid filter={"HomeActivity"} cols={3} rows={2} works={this.state.adWorks} />
          <WechatShare title="YAOPAI" desc="YAOPAI ，一个全球预约摄影师的平台">
          </WechatShare>
        </div>

      </div>
      </DocumentTitle>
      );
  }
});

export {Index as default};
