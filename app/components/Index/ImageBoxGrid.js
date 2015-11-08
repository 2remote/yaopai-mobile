var React = require('react');
import { Router, Route, Link } from 'react-router';
require('./ImageBoxGrid.css');
import {imgModifier} from '../Tools'

var ImageBoxGrid = React.createClass({
  getDefaultProps: function() {
    /* @松涛
      不知道写这里还是componentWillMount更合适。
      另外这个最好写到公共的地方，以后很多页面都需要用到这个参数。
      我先这样写着用了。
      @海涛
      应该写在componentWillMount更合适。
    */
    var deviceWidth = parseInt(window.innerWidth);
    return {
      deviceWidth: deviceWidth,
      workCover:  [{
        src: "imgs/indexPage/view-picture-image.jpg", 
        srcset: "imgs/indexPage/view-picture-image@2X.jpg 2x", 
        url: "/work"}],
      works: [
        {src: "imgs/cell3.png", url: "http://www.baidu.com"},
        {src: "imgs/cell6.png", url: "http://www.baidu.com"},
        {src: "imgs/cell7.png", url: "http://www.baidu.com"},
        {src: "imgs/cell8.png", url: "http://www.baidu.com"},
        {src: "imgs/cell9.png", url: "http://www.baidu.com"},
        {src: "imgs/cell10.png", url: "http://www.baidu.com"},
        {src: "imgs/cell11.png", url: "http://www.baidu.com"},
        {src: "imgs/cell12.png", url: "http://www.baidu.com"},

      ]
    };
  },
  render: function() {
    var deviceWidth = this.props.deviceWidth;
    var style = {
      width: deviceWidth/4,
      height: deviceWidth/4
    };
    var coverStyle = {
      width: deviceWidth/2,
      height: deviceWidth/2-0.9
    };
    // 就这一个，不应该用map的，我直接照搬你的先测试一下。
    // @可以先这么放着，等我们把别的页面写完，再弄不迟。
    var workCover = this.props.workCover.map(function(img){
      return (
        <li style={coverStyle} className="imageCell">
          <Link style={coverStyle} to={img.url} >
            <img style={{width: deviceWidth/2,height: deviceWidth/2}} 
              src={img.src} 
              srcSet={img.srcSet} />
          </Link>
        </li>
      );
    });
    var imgNodes = this.props.works.map(function(work){
      return (
        <li style={style} className="imageCell">
          <Link to={"/workDetail/"+work.Id} style={{display:'block'}} >
            <img style={style} src={imgModifier(work.Cover)} />
          </Link>
        </li>
      );
    });
    return (
      <ul className="imageBoxGrid">
        {workCover}
        {imgNodes}
      </ul>
    );
  }
});

module.exports = ImageBoxGrid;