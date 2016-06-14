import React from 'react';
var History = require('react-router').History;

import DoubleCheckInfo from './DoubleCheckInfo';
import GrapherActionBar from './GrapherActionBar';

var BookSuccessDialog = React.createClass({
  mixins: [History],
  handleClose: function () {
    this.history.go(-2);
  },
  render: function() {
    var style = {
      bookSuccessDialog: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        backgroundImage: 'url(imgs/bookPageBg.png)',
        paddingBottom: 30
      },
      headText: {
        fontSize: '2em',
        color: '#3c3c3c',
        fontWeight: 'lighter',
        margin: '29px auto 0'
      },
      subText:{
        marginBottom: 7
      },
      close: {
        position: 'absolute',
        right: 29,
        top: 25,
        margin: -15,
        padding: 15,
        fontSize: 22
      },
      doubleCheckTicket: {
        backgroundColor: 'white',
        margin: '0 auto',
        width:'90%'
      },
      wave:{
        backgroundImage: 'url("imgs/bookIntroBg.png")',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        width: '90%',
        margin: '0 auto',
        height: 20
      }
    };


    return (
      <div 
        style={style.bookSuccessDialog}
        className="bookSuccessDialog">
        <div style={style.headText} ref="headText" >订单成功！</div>
        <div style={style.subText}>请尽快与摄影师取得联系，方便您更好的摄影服务</div>
        <span 
          style={style.close}
          onClick={this.handleClose}
          ref="closeImage"
          className="icon close_icon" />
        <div 
          style={style.doubleCheckTicket}
          className="doubleCheckTicket">
          <DoubleCheckInfo />
        </div>
        <div style={style.wave}></div>
        <GrapherActionBar />
      </div>
    );
  }
});

export {BookSuccessDialog as default};
