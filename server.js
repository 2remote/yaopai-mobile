var express = require('express');
var session = require('express-session');
var Weixin = require('./weixin');
var app = express();
var router = express.Router();

app.use(express.static('build'));
app.use('/imgs', express.static('app/imgs'));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret: 'yaopai-mobile'
}))
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/*************************************** weixin start ***********************************************/
/**
 * 需要微信环境变量
 * WEIXIN_APPID
 * WEIXIN_SECRET
 * @type {Weixin}
 */
var weixin = Weixin.init({
  appid:process.env.WEIXIN_APPID,
  secret:process.env.WEIXIN_SECRET
});

router.get('/signPackage', function(req, res, next) {
  if(!process.env.WEIXIN_APPID){
    return res.json({
      status:400,
      error:'no weixin env'
    })
  }
  var result = {
    url:req.query.url,
    appid:weixin.appid,
    timestamp:weixin.createTimeStamp(),
    nonceStr:weixin.createNonceStr(),
    signature:'',
  }
  if(req.session.ticket &&  req.session.ticket.expires > result.timestamp){
    result.signature = weixin.getSignature(req.session.ticket.value, result.nonceStr, result.timestamp, result.url);
    res.json(result)
  }else{
    if(req.session.accessToken &&  req.session.accessToken.expires > result.timestamp){
      weixin.getTicket(req.session.accessToken.value,function (r) {
        console.log("ticket="+r)
        req.session.ticket = {
          value:r.ticket,
          expires:result.timestamp+parseInt(r.expires_in)
        };
        result.signature = weixin.getSignature(r.ticket, result.nonceStr, result.timestamp, result.url);
        res.json(result)
      })
    }else{
      weixin.getAccessToken(function (r) {
        console.log("accessToken=" + r)
        req.session.accessToken = {
          value:r.access_token,
          expires:result.timestamp+parseInt(r.expires_in)
        };
        weixin.getTicket(r.access_token,function (r) {
          console.log("ticket="+r)
          req.session.ticket = {
            value:r.ticket,
            expires:result.timestamp+parseInt(r.expires_in)
          };
          result.signature = weixin.getSignature(r.ticket, result.nonceStr, result.timestamp, result.url);
          res.json(result)
        })
      })
    }
  }
});
/****************************************** end ********************************************/


app.use('/', router);
var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/**
 * 如果环境变量存在qcloud 的SecretId 和 SecretKey 就认为需要刷新CDN
 * 环境变量需要:
 * QCLOUD_SECRETID : SecretId
 * QCLOUD_SECRETKEY : SecretKey
 * CDNURL : 需要刷新的Url
 */
var secretId = process.env.QCLOUD_SECRETID;
var secretKey = process.env.QCLOUD_SECRETKEY;
var cdnurl = process.env.CDNURL;

if(secretId && secretKey && cdnurl){
  var QcloudApi = require('./QcloudApi')
  var qcloud = new QcloudApi({
    SecretId: secretId,
    SecretKey: secretKey,
    method: 'GET',
    serviceType:'cdn',
  })
  qcloud.request({
    Region: 'gz',
    Action: 'RefreshCdnUrl',
    'urls.0': cdnurl,
  }, function(error, data) {
    console.log('Qcloud RefreshCdn result : ' + data);
  })
}

/****************************************** end ********************************************/