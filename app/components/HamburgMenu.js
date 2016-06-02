import React from 'react';
import Reflux from 'reflux';
import SidePage from './SidePage';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

var HamburgMenu = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange')],
  getInitialState : function(){
    return {
      userData : {}
    }
  },
  showLeft: function() {
    this.refs.mask.style.display = 'block';
    this.refs.left.show();
  },
  handleMask: function () {
    this.refs.mask.style.display = 'none';
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
          display: 'none'
        }}>
        </div>
        <div
          onClick={this.showLeft}
          style={ this.props.style || {
            position: 'fixed',
            top: 22,
            padding: 10,
            margin: -10,
            left: 22,
            zIndex: 99
          }}
          className="hamburgMenu">
        <span
          className="icon hamburgermenu"
          style={{fontSize:30, color:'black',padding:'5px 4px 3px 5px',background:'rgba(255,255,255,.5)',zIndex:'1'}} />
        <div>
          <SidePage ref="left" userData={this.state.userData}/>
        </div>
      </div>
    </div>
    );
  }
});

export {HamburgMenu as default};