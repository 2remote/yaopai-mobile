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
var ImageBoxGrid = require('./ImageBoxGrid');
import Slider from './Slider';

var Index = React.createClass({
  mixins : [
    Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'),
    Reflux.listenTo(AdStore,'_onAdStoreChange'),
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
      <DocumentTitle title="YAOPAI：一个全球预约摄影师平台">
      <div className="index">
        <HamburgMenu />
        
        <Slider />
        
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

          <ImageBoxGrid filter={"HomeAlbums"} number={12} picsInRow={4} works={this.state.adWorks} />

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

          <ImageBoxGrid filter={"HomeGrapher"} number={12} picsInRow={4} works={this.state.adWorks} />

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
        
          <ImageBoxGrid filter={"HomeInterview"} number={6} picsInRow={3} works={this.state.adWorks} />

        </div>

      </div>
      </DocumentTitle>
      );
  }
});

module.exports = Index;
