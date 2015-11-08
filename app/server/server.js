var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');

var mobiles = ['13552987637'];
var users = [
  {mobile: '13552987637', password : '1234' }
];

var root = __dirname;
root = '../../dist';
console.log('Server is running...');
console.log('Please browse http://localhost:5000/index.html');

var server = http.createServer(function (req, res) {

  if ('/api/user/exist_check' == req.url) {
    res.setHeader('Content-Type', 'text/json');
    switch (req.method) {
    case 'POST':
      exist_check(req, res);
      break;
    default:
      badRequest(res);
    }    
  } else if('/api/user/login' == req.url) {
    res.setHeader('Content-Type', 'text/json');
    switch (req.method) {
    case 'POST':
      login(req, res);
      break;
    default:
      badRequest(res);
    }    
  } else if('/api/graphers/list' == req.url){
    res.setHeader('Content-Type', 'text/json');
    switch(req.method) {
    case 'GET':
      listGraphers(req, res);
      break;
    default:
      badRequest(res);    
    }
  } else {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    fs.stat(path, function(err, stat){
      if (err) {
        if ('ENOENT' == err.code){
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      } else {
        res.setHeader('Content-Length', stat.size);
        var stream = fs.createReadStream(path);
        stream.pipe(res);
        stream.on('error', function(err){
          res.statusCode = 500;
          res.end('Internal server Error');
        });
      }
    }); 
  }
});

server.listen(5000);

function listGraphers(req, res){
  req.setEncoding('utf8');
  
  var graphers = [
  { id: 1, name: "尹超",   nick: "YIN CHAO",      location: "北京", img: "imgs/yinchao.jpg"},
  { id: 2, name: "尤奕",   nick: "YOU YI",        location: "上海", img: "imgs/youyi.jpg"},        
  { id: 5, name: "陈明乔", nick: "CHEN MINGQIAO", location: "深圳", img: "imgs/chenmingqiao.jpg"},
  { id: 6, name: "尹超",   nick: "YIN CHAO",      location: "北京", img: "imgs/youyi.jpg"}
  ];
  res.end(JSON.stringify(graphers));
}

function notFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
}

function badRequest(res) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bad Request');
}

function exist_check(req, res) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){ body += chunk});
  req.on('end', function(){
    var obj = qs.parse(body);
    if ( mobiles.indexOf(obj.mobile) >= 0){
      res.end('true');
    }else{
      res.end('false');
    }
  });
}

function login(req, res) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){ body += chunk});
  req.on('end', function(){
    var obj = qs.parse(body);
    if ( login_check(obj)){
      res.end('true');
    }else{
      res.end('false');
    }
  });
}

function login_check(obj) {
  var flag = false;
  users.forEach(function(user) {
    if (user.mobile == obj.mobile ){
      if ( user.password == obj.password) {
        flag = true;
      }
    } 
  });
  return flag;
}