import React from 'react';
import { History } from 'react-router';

import DoubleCheckInfo from './DoubleCheckInfo';
import GrapherActionBar from './GrapherActionBar';
import './bookPage.scss';

var BookSuccessDialog = React.createClass({
  mixins: [History],
  handleClose: function () {
    this.history.go(-2);
  },
  render() {
    return (
      <div
        className="bookSuccessDialog">
        <div className="headText" ref="headText" >订单成功！</div>
        <div className="subText">请尽快与摄影师取得联系，方便您更好的摄影服务</div>
        <span
          onClick={this.handleClose}
          ref="closeImage"
          className="close icon close_icon" />
        <div className="doubleCheckTicket">
          <DoubleCheckInfo />
        </div>
        <div className="wave"></div>
        <GrapherActionBar />
      </div>
    );
  }
});

export {BookSuccessDialog as default};
