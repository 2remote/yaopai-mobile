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
var weixin = Weixin.init({
  // appid && secret
});

router.get('/signPackage', function(req, res, next) {
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
