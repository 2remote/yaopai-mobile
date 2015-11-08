var React = require('react');
var Reflux = require('reflux');

var UserAction = Reflux.createAction({
  asyncResult: true,
  children : ['login','register','logout']
});

UserAction.login.listen(function (data) {
  $.post('',data).then(this.loginCompleted);
});

UserAction.register.listen(function(data){
  $.post('',data).then(this.registerCompleted);
});

UserAction.logout.listen(function(data){
  $.post('',data).then(this.logout);
});

module.exports = UserAction;
