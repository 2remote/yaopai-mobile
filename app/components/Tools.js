import { API_URL } from '../api';
import React from 'react';
import { Link } from 'react-router';

exports.imgModifier = function  (img, mode, width) {
  let modifies;
  if(img === null || img === undefined ){
    console.warn('There is NO img link.');
    return "";
  }

  switch(mode){
  case "work":
    modifies = 'imageMogr2/auto-orient/thumbnail/600x/interlace/1';
    break;
  case "workCover":
    modifies = 'imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x336a0a80/interlace/1';
    break;
  case "ad":
    // 首页走马灯，访谈活动列表页裁剪规则
    modifies = 'imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x336/interlace/1';
    break;
  case "avatar":
    modifies = 'imageView2/1/w/52/h/52/interlace/1';
    break;
  case "grapherAvatar":
    modifies = 'imageView2/1/w/160/h/160/interlace/1';
    break;
  case "ImageBoxGrid":
    modifies = 'imageMogr2/gravity/Center/thumbnail/!' + width + 'x' + width + 'r/crop/' + width + 'x' + width + '/interlace/1';
    break;
  case "HomeGrapher":
    modifies = 'imageMogr2/thumbnail/80000@';
    break;
  default:
    /*首页方块裁切函数，先不做修改*/
    modifies = 'imageMogr2/gravity/Center/thumbnail/!100x100r/crop/100x100/interlace/1';
  }
  
  return img + '?' + modifies;
};


exports.parseImageUrl = function(url,width,height){
  url = url + '?imageMogr2/auto-orient/gravity/Center';
  if(width && height){
    url = url + '/thumbnail/!'+width+'x'+ height+'r'; //限制短边
    url = url + '/crop/'+width + 'x' + height; //剪裁
  }
  if(width && !height){
    url = url + '/thumbnail/'+width+'x'; //只缩放宽度,不剪裁
  }
  if(height && !width){
    url = url + '/thumbnail/x'+height; //只缩放高度,不剪裁
  }
  url = url + '/interface/1'; //渐进
  return url;
};

exports.makeIconButton = function (icon, title, link="javascript:;", router="normalLink") {
  if(router == 'normalLink'){
    return (
      <div className="weui_cells weui_cells_access" >
        <a className="weui_cell" href={link} >
            <div className="weui_cell_hd">
                <div className={"icon " + icon}
                    style={{fontSize:25, paddingRight:10}} />
            </div>
            <div className="weui_cell_bd weui_cell_primary">
                <p className="titleDemo">{title}</p>
            </div>
            <div className="weui_cell_ft" />
        </a>
      </div>
    )
  }else{
    return (
      <div className="weui_cells weui_cells_access" >
        <Link className="weui_cell" to={link} >
            <div className="weui_cell_hd">
                <div className={"icon " + icon}
                    style={{fontSize:25, paddingRight:10}} />
            </div>
            <div className="weui_cell_bd weui_cell_primary">
                <p className="titleDemo">{title}</p>
            </div>
            <div className="weui_cell_ft" />
        </Link>
      </div>
    )
  }
};

exports.makeTextButton = function (title, content, link="javascript:;", router="normalLink") {
  function makeTextButtonTitle (title) {
    return (
      <div className="weui_cell_bd weui_cell_primary">
          <p className="titleDemo">{title}</p>
      </div>
    )
  }

  function makeTextButtonContent (content) {
    return (
      <div className="weui_cell_ft" >
        {content}
      </div>
    )
  }
  
  if(router == 'normalLink'){
    return (
      <div className="weui_cells weui_cells_access" >
        <a className="weui_cell" href={link} >
          {makeTextButtonTitle(title)}
          {makeTextButtonContent(content)}
        </a>
      </div>
    )
  }else{
    return (
      <div className="weui_cells weui_cells_access" >
        <Link className="weui_cell" to={link} >
            {makeTextButtonTitle(title)}
            {makeTextButtonContent(content)}
        </Link>
      </div>
    )
  }
};

/*
  格式化日期
  format 传入格式 'yyyy-MM-dd'
*/
exports.dateFormat = function(date, format) {
  if(format === undefined){
    format = date;
    date = new Date();
  }
  var map = {
    "M": date.getMonth() + 1, //月份 
    "d": date.getDate(), //日 
    "h": date.getHours(), //小时 
    "m": date.getMinutes(), //分 
    "s": date.getSeconds(), //秒 
    "q": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
    var v = map[t];
    if(v !== undefined){
      if(all.length > 1){
        v = '0' + v;
        v = v.substr(v.length-2);
      }
      return v;
    }
    else if(t === 'y'){
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
};

exports.actionLinkMaker = function (action, extraId) {
  switch (action){
  case 'Link':
    return;

  case 'GrapherId':
    return '/grapherDetail/'+extraId;

  case 'GrapherList':
    return'/grapher';

  case 'AlbumsId':
    return'/workDetail/'+extraId;

  case 'AlbumsList':
    return'/work';

  case 'ActivityId':
    return'/activityDetail/'+extraId;

  case 'ActivityList':
    return'/activity';

  case 'InterviewId':
    return'/interviewDetail/'+extraId;

  case 'InterviewList':
    return'/interview';
  }
};

// 页面调取数据接口
export const API = API_URL;

// 调取 作品二级列表页面信息
const listAllWorks = 'Albums.Search';
const workGeneralFields = '&Fields=Title,Cover,user.nickname,userid,user.Avatar,ID';

export const LIST_ALL_WORKS = API + listAllWorks + workGeneralFields;

// 调取 访谈二级列表页面信息
const listAllInterviews = 'Interview.Search';
const interviewGeneralFields = '&Fields=Id,Cover,Link';

export const LIST_ALL_INTERVIEWS = API + listAllInterviews + interviewGeneralFields;

// 调取 作品详情 信息
const listWorkDetail = 'Albums.get';
const workDetailFields = ',photos.url,Negotiable,Price,Service';

export const GET_WORK_DETAIL = API + listWorkDetail + workGeneralFields + workDetailFields;

// 调取 作品介绍 信息
const workIntroFileds = '&Fields=Title,Cover,ID,Price,Photographer.BusinessPhone';
export const GET_WORK_INTRO = API + listWorkDetail + workIntroFileds;

// 调取 预约作品 接口
const bookWork = 'Order.Add';
export const BOOK_A_WORK = API + bookWork ;

// 页面标题
export const TITLE = {
  indexPage: 'YAOPAI，一个全球预约摄影师的平台',
  workPage: 'YAOPAI 作品库',
  grapherPage: 'YAOPAI 摄影师精选',
  workDetailPage: '_YAOPAI',
  grapherDetailPage: 'YAOPAI 认证摄影师_',
  interviewPage: 'YAOPAI 全部访谈',
  interviewDetailPage: '_YAOPAI',
  activityPage: 'YAOPAI 全部活动',
  activityDetailPage: '_YAOPAI'
};
