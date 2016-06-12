// var API_URL = 'http://localhost:3000';
const DEV_ENV = '//dev.api.aiyaopai.com/';
const PRODUCTION_ENV = '//api.aiyaopai.com/';

let DOMAIN = DEV_ENV;

//获取当前网站的根目录
var Local_Host = "";
var Local_Href="";

if(typeof window != 'undefined'){
  Local_Host = window.location.host;
  Local_Href = window.location.href;  
}

//根据local host切换api
function hasHost(host) {
  return host.length > 0;
}

function isDevHost(host) {
  const re = /mobile-pr|dev\.|192\.|localhost|0\./i;
  const founds = host.match(re);
  if (founds != null) {
    return true;
  } else {
    return false;
  }
}

function isProdHost(host) {
  return !isDevHost(host);
}

if (hasHost(Local_Host) && isProdHost(Local_Host)) {
  DOMAIN = PRODUCTION_ENV;
}

const API_URL = DOMAIN + '?api=';

var API_CONST = {
  isProd: DOMAIN === PRODUCTION_ENV,
  API_URL: API_URL,
  USER: {
    login: API_URL + 'User.Login',
    login_with_token: API_URL + 'User.LoginWithToken',
    register: API_URL + 'User.ReceiveTelRegister',
    sendTelRegister: API_URL + "User.SendTelRegister",
    sendTelRestPassword: API_URL + "User.SendTelResetPassWord",
    modify_password: API_URL + 'User.ChangePassword',
    verifyTelResetPassWord: API_URL + 'User.VerifyTelResetPassWord',
    receiveTelResetPassWord: API_URL + 'User.ReceiveTelResetPassWord',
    logout: API_URL + "User.Logout",
    weixin_login: API_URL + "openuser.login&serviceid=weixin&redirecturl=" + Local_Href,
    current_user: API_URL + 'User.CurrentUser',
    currentUserDetail: API_URL + 'User.CurrentUserDetail',
    changeInfo: API_URL + 'User.ChangeInfo',
    changeAvatar: API_URL + 'User.ChangeAvatar',
    updateInfo: API_URL + 'User.ChangeInfo'
  },
  USERFUND: {
    currentAccount: API_URL + 'UserFunds.CurrentAccount',
    recordsSearch:  API_URL + 'UserFunds.RecordsSearch',//摄影师资金流水列表
    withdrawalGet:  API_URL + 'UserFunds.WithdrawalGet',
    sendTelAccount: API_URL + 'UserFunds.SendTelAccountChange', //发送修改收款帐号认证短信or绑定支付宝短信(让后台发验证码)
    receiveTelAccount: API_URL + 'UserFunds.ReceiveTelAccountChange', //接收修改当前用户收款帐号短信or绑定支付宝(填好了,发给后台验证)
    withdrawalAdd:API_URL + 'UserFunds.WithdrawalAdd',
    weixinAuthGet: API_URL + 'OpenUser.WeixinAuthGet'
  },
  PHOTOGRAPHER: {
    submitAudit: API_URL + 'Photographer.SubmitAudit',
    viewAudit: API_URL + 'Photographer.ViewAudit',
    get: API_URL + 'Photographer.Get',
    list: API_URL + 'Photographer.Search',
    viewAdd: API_URL + 'Photographer.ViewAdd'
  },
  ALBUMS: {
    add: API_URL + 'Albums.Add',
    update: API_URL + 'Albums.Update',
    delete: API_URL + 'Albums.Delete',
    get: API_URL + 'Albums.Get',
    search: API_URL + 'Albums.Search',
    categories: API_URL + 'AlbumsCategory.Search',
    offSale: API_URL + 'Albums.SalesOff',
    onSale: API_URL + 'Albums.SalesOn',
    getById: API_URL + 'Albums.Search',
  },

  INTERVIEW: {
    search: API_URL + 'Interview.Search',
    get: API_URL + 'Interview.Get'
  },

  ACTIVITY: {
    search: API_URL + 'Activity.Search',
    get: API_URL + 'Activity.Get'
  },
  
  AD: {
    list: API_URL + 'Ad.List'
  },
  
  TAG: {
    list: API_URL + 'Tag.List'
  },

  ORDER: {
    outSearch: API_URL + 'Order.OutSearch',
    inSearch: API_URL + 'Order.InSearch',
    get: API_URL + 'Order.Get',
    confirm: API_URL + 'Order.Confirm',
    add: API_URL + 'Order.Add',
    close: API_URL + 'Order.Close',
    refund: API_URL + 'Order.RefundApply', // 退款
    receive: API_URL + 'Order.Reception', // 接单
    deliver: API_URL + 'Order.Delivery', // 发片
    accept: API_URL + 'Order.Acceptance', // 收片
    pay: DOMAIN + 'payment/token?tokenId=',
    wechatRedirect: DOMAIN + 'payment/successful?orderId='
  },
  FILE: {
    getToken: API_URL + 'File.Token',
    user_token_url: DOMAIN + 'file/token?type=user',
    work_token_url: DOMAIN + 'file/token?type=work'
  },
  COMMON: {
    area_list: API_URL + 'Area.List'
  }
};

function getRootPath_web() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
  return (prePath + postPath);
}

module.exports = API_CONST;