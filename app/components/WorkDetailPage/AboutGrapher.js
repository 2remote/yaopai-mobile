import React from 'react';
import { Link } from 'react-router';

var browser = {
  versions: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象

const AboutGrapher =({data, id}) => {
  let isShow = false;
  if (browser.versions.mobile && browser.versions.iOS /*&& ua.match(/MicroMessenger/i) == "micromessenger" */) {
    isShow = true;
  }

  const downloadApp = () => {
    if (browser.versions.mobile && browser.versions.iOS && ua.match(/MicroMessenger/i) == "micromessenger") {
      alert('由于微信限制，请在 Safari 浏览器里打开本网页，再点击下载 APP')
      return;
    }
  }
  return (
    <div className="grapher-panel">
      <Link to={`/grapherDetail/${id}`}>
        <div className="avatar" style={
        {backgroundImage:`url(${data.Avatar})`,
        backgroundSize:'cover',
        height:'80px',
        width:'80px',
        borderRadius:'50%'}
        }>
        </div>
      </Link>
      <p className="uName">{data.NickName}</p>
      <p className="uDes">YAOPAI认证摄影师</p>
      {
        isShow ?
        <a
          href="https://itunes.apple.com/us/app/yaopai/id1105711466?l=zh&ls=1&mt=8"
          className="button btn-dark download-app"
          onClick={() => downloadApp()}
        >
          <i className="icon talk" /> 下载 APP 联系我
        </a>
        : ''
      }
    </div>
  );
}

export {AboutGrapher as default};
