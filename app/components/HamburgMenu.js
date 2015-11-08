var React = require('react');
var Reflux = require('reflux');
var SidePage = require('./SidePage');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var HamburgMenu = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange')],
  getInitialState : function(){
    return {
      userData : {}
    }
  },
  showLeft: function() {
    this.refs.mask.getDOMNode().style.display = 'block';
    this.refs.left.show();
  },
  handleMask: function () {
    this.refs.mask.getDOMNode().style.display = 'none';
    this.refs.left.hide();
  },
  _onUserStoreChange : function  (userData) {
    this.setState({userData : userData});
  },
  componentDidMount : function(){
    UserActions.currentUser();
  },
  render: function() {
    return (
      <div>
        <div ref="mask" className="mask" onClick={this.handleMask} style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,.5)',
          zIndex: '99',
          display: 'none',
        }}>
        </div>
        <div
        onClick={this.showLeft}
        style={{
          position: 'fixed',
          top: 22,
          padding: 10,
          margin: -10,
          left: 22,
          zIndex: 99,
        }}
        className="hamburgMenu">
        <img 
          src="imgs/indexPage/hamburg-icon.png"
          srcSet="imgs/indexPage/hamburg-icon@2X.png 2x" />
        <div>
          <SidePage ref="left" userData={this.state.userData}/>
        </div>
      </div>
    </div>
    );
  }
});

module.exports = HamburgMenu;
