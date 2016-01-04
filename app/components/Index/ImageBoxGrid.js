// ImageBoxGrid 组件
// 
// 显示以方块构成的图片列表
// 
// 输入：
// filter - 过滤关键字，参考：https://xiattst.gitbooks.io/yaopai/content/API/Ad/LIst.html 的广告位说明
// cols - 图片列数
// rows - 图片行数
// works - 图片列表
// 
// 范例：
// var ImageBoxGrid = require('./ImageBoxGrid');
// <ImageBoxGrid filter={"HomeAlbums"} cols={3} rows={4} works={this.state.recommendInterviews} />
// 
// works - data demo
//   [{
//         "Id": 4,
//         "Position": "HomeInterview",
//         "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/73e072f3-70cb-4c2b-a00b-309db1216a8a.png",
//         "Action": "Link",
//         "ExtraId": 0,
//         "Url": "http://www.baidu.com"
//     }, {
//         "Id": 2,
//         "Position": "HomeAlbums",
//         "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
//         "Action": "GrapherList",
//         "ExtraId": 31,
//         "Url": "http://localhost:8082/Advertisement/Create1"
//     }, {
//         "Id": 3,
//         "Position": "HomeGrapher",
//         "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/83075f25-7d11-436c-9510-43899578208f.jpg",
//         "Action": "GrapherId",
//         "ExtraId": 4,
//         "Url": ""
//     }, {
//         "Id": 1,
//         "Position": "HomeSlide",
//         "Image": "http://7xlxnz.com1.z0.glb.clouddn.com/ad/c48f682b-3342-48e2-9058-df99f7f5e45e.jpg",
//         "Action": "Link",
//         "ExtraId": 0,
//         "Url": ""
//    }]

var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier, actionLinkMaker } from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      works: []
    };
  },
  render: function() {
    let filter = this.props.filter;
    let deviceWidth = this.props.deviceWidth;

    let borderWidth;
    let borderHeight;
    if (filter == 'HomeGrapher') {
      borderWidth = '22.8%';
      borderHeight = 398/750*deviceWidth;
    } 
    
    let borderSize = deviceWidth/this.props.cols;
    let style = {
      width:  borderWidth || borderSize,
      height: borderHeight || borderSize
    };
    let homeGrapherLastStyle = {
      width:  '31.6%',
      height: borderHeight
    };
  

    var initNodes = [];
    const number = this.props.cols * this.props.rows;
    for (var i = 0; i < number; i++) {
      // 每次load生成不同颜色
      var bkColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      initNodes.push((<li key={i} style={{
        width: borderWidth || borderSize,
        height: borderHeight || borderSize,
        backgroundColor: bkColor
      }} className="imageCell"></li>));
    };

    var work = this.props.works.filter(function(item){
      return item.Position == filter
    }).slice(0,number)
    var imgNodes = work.map(function(work, i){
      var extraId = work.ExtraId;
      
      var url = work.Url;
      if (work.Action !== 'Link'){
        url = "#" + actionLinkMaker(work.Action, work.ExtraId); 
      }

      initNodes[i] = (
        <li key={i} 
            style={ (i === 3 & filter == 'HomeGrapher') ? homeGrapherLastStyle : style }
            className="imageCell">
          <a href={url} style={{display:'block'}} >
            <img 
              style={ (i === 3 & filter == 'HomeGrapher') ? homeGrapherLastStyle : style }
              src={imgModifier(work.Image, 'ImageBoxGrid', borderSize*window.devicePixelRatio)} />
          </a>
        </li>
      );
    });

    return (
      <ul className="imageBoxGrid">
        {initNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;