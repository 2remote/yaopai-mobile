'use strict';

var React = require ('react');
var $ = require('jquery');

var WechatShare = React.createClass({
  propTypes: {
    title:React.PropTypes.string,
    desc:React.PropTypes.string,
    link:React.PropTypes.string,
    imgUrl:React.PropTypes.string,
    apis:React.PropTypes.array,
    //onShareTimeLineSuccess:React.PropTypes.func,
    //onShareAppMessageSuccess:React.PropTypes.func
  },
  getInitialState() {
    return {
      isWechatReady:false
    };
  },
  getDefaultProps() {
    return {
      apis:['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'],
      link:location.href
    };
  },
  componentDidMount() {
    let self=this;
    console.log(location.href)
    return
    $.ajax({
      url: '//m.aiyaopai.com/signPackage?url=' + location.href,
      dataType: 'json',
      type: "GET",
      success: function (data) {
        console.log(data)
        initWechat(data)
      },
      error : function() {
        console.log('fail');
      }
    })
    function initWechat(data){
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: self.props.apis, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
        currentUrl:self.props.link //hack wechat js, you must
      });
    }

    wx.ready(function(){
      self.setState({
        isWechatReady:true
      })
      wx.onMenuShareTimeline({
        title: self.props.title, // 分享标题
        link: self.props.link, // 分享链接
        imgUrl: self.props.imgUrl, // 分享图标
        success: function () {
          console.log("onMenuShareTimeline success")
          // 用户确认分享后执行的回调函数
          if(self.props.onShareTimeLineSuccess){
            self.props.onShareTimeLineSuccess()
          }
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log("onMenuShareTimeline cancel")
        }
      });

      wx.onMenuShareAppMessage({
        title: self.props.title, // 分享标题
        desc: self.props.desc, // 分享描述
        link: self.props.link, // 分享链接
        imgUrl: self.props.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          console.log("onMenuShareAppMessage success")
          // 用户确认分享后执行的回调函数
          if(self.props.onShareAppMessageSuccess){
            self.props.onShareTimeLineSuccess()
          }
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          console.log("onMenuShareAppMessage cancel")
        }
      });
    })

    let url=this.props.link;

  },
  render(){
    return <div></div>
  }
});

module.exports = WechatShare;