// ImageBoxGrid 组件
// 
// 显示以方块构成的图片列表
// 
// 输入：
// filter - 过滤关键字，参考：https://xiattst.gitbooks.io/yaopai/content/API/Ad/LIst.html 的广告位说明
// number - 显示的图片数目
// works - 图片列表
// picsInRow - 单行图片数量
// 
// 范例：
// var ImageBoxGrid = require('./ImageBoxGrid');
// <ImageBoxGrid filter={"HomeAlbums"} number={6} picsInRow={3} works={this.state.recommendInterviews} />

var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier} from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      works: []
    };
  },
  render: function() {
    var deviceWidth = this.props.deviceWidth;
    var borderSize = deviceWidth/this.props.picsInRow;
    var style = {
      width:  borderSize,
      height: borderSize
    };

    var filter = this.props.filter;

    var initNodes = [];
    for (var i = 0; i < this.props.number; i++) {
      // 每次load生成不同颜色
      var bkColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      initNodes.push((<li style={{
        width: borderSize,
        height: borderSize,
        backgroundColor: bkColor
      }} className="imageCell"></li>));
    };
    
    var imgNodes = this.props.works.map(function(work, i){
      var extraId = work.ExtraId;
      var url = '';
      switch (work.Action){
      case 'Link':
        url = work.Url;
        break;
      case 'GrapherId':
        url = '/grapherDetail/'+extraId;
        break;
      case 'GrapherList':
        url = '/grapher';
        break;
      case 'AlbumsId':
        url = '/workDetail/'+extraId;
        break;
      case 'AlbumsList':
        url = '/work';
        break;
      case 'ActivityId':
        url = '/activityDetail/'+extraId;
        break;
      case 'ActivityList':
        url = '/activity';
        break;
      case 'InterviewId':
        url = '/interviewDetail/'+extraId;
        break;
      case 'InterviewList':
        url = '/interview';
        break;
      }
      if(filter == work.Position ){
        if(work.Action == 'Link'){
          initNodes[i] = (
            <li style={style} className="imageCell">
              <a href={url} style={{display:'block'}} >
                <img style={style} src={imgModifier(work.Image)} />
              </a>
            </li>
          );
        }else{
          initNodes[i] = (
            <li style={style} className="imageCell">
              <Link style={{display:'block'}} to={url}>
                <img style={style} src={imgModifier(work.Image)} />
              </Link>
            </li>
          );
        }
      }
    });

    return (
      <ul className="imageBoxGrid">
        {initNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;