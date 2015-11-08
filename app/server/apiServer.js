var http = require('http');
var qs = require('querystring');
var mobiles = ['13552987637'];
var users = [
  {mobile: '13552987637', password : '1234' }
];

var server = http.createServer(function (req, res) {
  console.log(req.url);
  res.setHeader('Content-Type', 'text/json');

  if ('/api/user/exist_check' == req.url) {
    switch (req.method) {
    case 'POST':
      exist_check(req, res);
      break;
    default:
      badRequest(res);
    }    
  } else if('/api/user/login' == req.url) {
    switch (req.method) {
    case 'POST':
      login(req, res);
      break;
    default:
      badRequest(res);
    }    
  } else {
    notFound(res);
  }
});

server.listen(3000);

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