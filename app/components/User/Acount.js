var React = require('react');
var Reflux = require('reflux');
var UserStore = require('./UserStore');

var Acount = React.createClass({
  mixins: [Reflux.listenTo(UserStore, 'onStatusChange')],
  getInitialState: function () {
    return {currentUser : UserStore.currentUser};
  },
  onStatusChange: function () {
    this.setState({currentUser : UserStore.currentUser});
  },
  render : function(){
    return(
      <div className="navbar-form navbar-right">
        {function(){
          if(this.state.isLogin){
            return <p>{this.state.currentUser.userName}</p>
          }else{
            return <p>请登录</p>
          }
        }}
      </div>
    );
  }
});

module.exports = Acount;