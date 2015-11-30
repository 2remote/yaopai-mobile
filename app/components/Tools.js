import { API_URL } from '../api';

exports.imgModifier = function  (img, mode) {
  let modifies;
  if(img === null || img === undefined ){
    console.warn('There is NO img link.');
    return "";
  };

  switch(mode){
  case "work":
    modifies = 'imageMogr2/auto-orient/interlace/1';    
    break;
  case "workCover":
    modifies = 'imageMogr2/auto-orient/thumbnail/600x/gravity/north/crop/!600x400a0a80/interlace/1';
    break;
  case "avatar":
    modifies = 'imageView2/1/w/52/h/52/interlace/1';
    break;
  case "grapherAvatar":
    modifies = 'imageView2/1/w/160/h/160/interlace/1';
    break;
  default:
    modifies = 'imageMogr2/gravity/Center/thumbnail/!600x600r/crop/600x600/interlace/1';    
  }
  
  return img + '?' + modifies;
}


exports.parseImageUrl = function(url,width,height){
  url = url + '?imageMogr2/auto-orient/gravity/Center'
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
}
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
}

// 页面调取数据接口
export const API = API_URL;

// 调取 作品二级列表页面信息
const listAllWorks = 'Albums.Search';
const workGeneralFields = '&Fields=Title,Cover,user.nickname,userid,user.Avatar,ID';

export const LIST_ALL_WORKS = API + listAllWorks + workGeneralFields;

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