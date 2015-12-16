var React = require('react');

import { Router, Route, Link } from 'react-router';

var ShareGuide = React.createClass({
  getInitialState: function () {
    return {
      opacity: 0,
      display: 'none',
    }
  },
  showGuide: function () {
    this.setState({display: 'block'});
    setTimeout(function () {
      this.setState({opacity: 1});
    }.bind(this), 100)
  },
  hideGuide: function () {
    this.setState({opacity: 0});
    setTimeout(function () {
      this.setState({display: 'none'});
    }.bind(this), 500)
  },
  render: function () {
    var style = {
      mask: {
        display: this.state.display,
        opacity: this.state.opacity,
        transition: 'all 0.5s',
        WebkitTransition: 'all 0.5s',
        MozTransition: 'all 0.5s',
        OTransition: 'all 0.5s',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,.8)',
        zIndex: 9999,
      }
    }
    return (
      <div style={style.mask} onClick={this.hideGuide}>
        <img width="100%" 
          src="imgs/workDetailPage/share-guide@2x.png" 
          srcSet="imgs/workDetailPage/share-guide@2x.png" />
      </div>
    );
  }
});

var ActionBar = React.createClass({
  bookWork: function(){
    console.log("作品预约按钮激活。");
    this.props.onBook();
  },
  _handleShare: function () {
    this.refs.shareGuide.showGuide();
  },
  render: function() {
    return (
      <div className="actionBar" style={{paddingTop:22.5,height: 103.5,textAlign:'center'}}>
        <ShareGuide ref="shareGuide" />
        <div style={{float:'left',marginLeft: '22.666666%'}}>
           <Link to={"/work_book_page/" + this.props.workId +'/0'} style={{lineHeight: 'inherit'}} >
            <span
              ref="bookIcon"
              className="icon order_icon" 
              style={{fontSize:55}} />
            <div
              ref="bookOption">
              预约
            </div>
          </Link>
        </div>
        <div onClick={this._handleShare} style={{float:'right',marginRight: '22.666666%'}}>
          <span
            ref="shareIcon"
            className="icon share_icon" 
            style={{fontSize:55}} />
          <div
            ref="shareOption" >分享</div>
        </div>
      </div>
    );
  }
});

module.exports = ActionBar;