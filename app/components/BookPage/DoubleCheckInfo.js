import React from 'react';
import './bookPage.scss';

var DoubleCheckInfo = React.createClass({

  getDefaultProps: function() {
    return {
      order: {
        Photograper : {}
      }
    };
  },

  render() {
    return (
      <div className="doubleCheckInfo">
        <img
          className="grapherImage"
          ref="grapherImage"
          src={this.props.order.Albums?this.props.order.Albums.Cover:this.props.order.Photographer?this.props.order.Photographer.Avatar:''} />

        <div
          className="grapherName"
          ref="grapherName" >{this.props.order.Albums?this.props.order.Albums.Title:this.props.order.Photographer?this.props.order.Photographer.NickName:''}</div>

        <span
          ref="priceImage"
          className="priceImage icon price_icon"
         />

        <span
          className="grapherPrice"
          ref="grapherPrice" >{this.props.order.Price?this.order.Price:'面议'}</span>

        <div>
          <span
            className="label"
            ref="userNameLabel">预约姓名</span>
          <input
            className="input"
            ref="usernameInput"
            type="text"
            disabled
            value={this.props.order.BuyerName}
            placeholder="将显示您的预订姓名" />
        </div>
        <div>
          <span
            className="label"
            ref="mobilePhoneLabel">预约电话</span>
          <input
            className="input"
            ref="mobilePhoneInput"
            type="text"
            disabled
            value={this.props.order.BuyerTel}
            placeholder="将显示您的联系电话" />
        </div>
        <div>
          <span
            className="label"
            ref="dateLabel">拍摄日期</span>
          <input
            className="input"
            ref="dateInput"
            type="text"
            disabled
            value={(this.props.order.AppointedTime + '').slice(0,10)}
            placeholder="将显示您的拍摄日期" />
        </div>

      </div>
    );
  }
});

export {DoubleCheckInfo as default};
