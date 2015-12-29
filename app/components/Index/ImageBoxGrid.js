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
    var deviceWidth = this.props.deviceWidth;
    var borderSize = deviceWidth/this.props.cols;
    var style = {
      width:  borderSize,
      height: borderSize
    };

    var filter = this.props.filter;

    var initNodes = [];
    const number = this.props.cols * this.props.rows;
    // console.log('imageBoxGrid number', number);
    for (var i = 0; i < number; i++) {
      // 每次load生成不同颜色
      var bkColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      initNodes[i] = ((<li style={{
        width: borderSize,
        height: borderSize,
        backgroundColor: bkColor
      }} className="imageCell"></li>));
    };

    var filtered_works = this.props.works.filter(function (work) {
      if (work.Position == filter){
        return work;
      }
    });
    
    // console.log('filtered_works', filtered_works);

    if ( filtered_works.length > 0 ){
      var imgNodes = initNodes.map(function(node, i){
        var extraId = filtered_works[i].ExtraId;
        
        var url = filtered_works[i].Url;
        if (filtered_works[i].Action !== 'Link'){
          url = "#" + actionLinkMaker(filtered_works[i].Action, filtered_works[i].ExtraId); 
        }

        if(filter == filtered_works[i].Position ){
          // console.log('found position:', filter, 'with i:', i);
          initNodes[i] = ((
            <li style={style} className="imageCell">
              <a href={url} style={{display:'block'}} >
                <img style={style} src={imgModifier(filtered_works[i].Image)} />
              </a>
            </li>
          ));  
        }
      });
    }

    return (
      <ul className="imageBoxGrid">
        {initNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;