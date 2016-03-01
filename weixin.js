/**
 * Created by zoey on 2016/1/21.
 */
var urlParse = require('url').parse;
var crypto = require('crypto');
/**
 * 微信类，实现微信的所有接口
 * @param options
 * @constructor
 */
var Weixin = function (options) {
  this.accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}';
  this.getTicketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={ACCESS_TOKEN}&type=jsapi';
  this.appid = options.appid || '';
  this.secret = options.secret || '';

  this.accessToken = '';
};
/**
 * 初使化
 * @param options
 * {
 *     token: ''    //自己在公共平台填写的token值
 * }
 * @returns {Weixin}
 */
Weixin.init = function (options) {
  return new Weixin(options);
};
Weixin.prototype.getAccessToken = function (callback) {
  var url = this.accessTokenUrl.replace('{APPID}', this.appid).replace('{APPSECRET}', this.secret);
  httpHandle(url, 'GET', {}, {}, function (r) {
    if (callback) {
      callback(r);
    }
  });
};
Weixin.prototype.getTicket = function (accessToken, callback) {
  var url = this.getTicketUrl.replace('{ACCESS_TOKEN}', accessToken);
  //callback({"errcode":0,"errmsg":"ok","ticket":"sM4AOVdWfPE4DxkXGEs8VOT8rBGqpDxFDgN6o2Hsv-TcJAWuvcxe0GzyHBGVuLW_A6H2Snmwx257HLxl0W2Kcg","expires_in":7200})
  console.log("ticket url = "+url)
  httpHandle(url, 'GET', {}, {}, function (r) {
    if (callback) {
      callback(r);
    }
  });
};
Weixin.prototype.getSignature = function (ticket, noncestr, ts, url) {
  var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
  console.log("signture "+str)
  var sha1Sum = crypto.createHash('sha1');
  var v = sha1Sum.update(str).digest('hex');
  return v
};
Weixin.prototype.createTimeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};
Weixin.prototype.createNonceStr = function() {
  return Math.random().toString(36).substr(2, 15);
};




//////////////////////////////util///////////////////////////
httpHandle = function (url, method, header, postData, callback) {
  var contents = JSON.stringify(postData);
  var urlObj = urlParse(url);
  header['Content-Length'] = Buffer.isBuffer(contents) ? contents.length : Buffer.byteLength(contents);

  var options = {
    type: urlObj.protocol.replace(':', ''),
    host: urlObj.hostname,
    port: this.type == 'http' ? 80 : 443,
    path: urlObj.path, // 具体路径, 必须以'/'开头, 是相对于host而言的
    method: method,
    headers: header
  };

  var req = require(options.type == 'http' ? 'http' : 'https').request(options, function (res) {
    var bufferHelper = '';
    res.setEncoding('utf8');

    res.on('data', function (data) {
      bufferHelper += data;
    });

    // 在数据发送完毕后触发
    res.on('end', function () {
      callback(JSON.parse(bufferHelper));
    });
  });

  req.write(contents);
  req.end();
};
module.exports = Weixin;