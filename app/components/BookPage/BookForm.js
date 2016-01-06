var React = require('react');

import { Router, Route, Link } from 'react-router';

var BookForm = React.createClass({
  getInitialState: function() {
    var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10);
    return {userInput: nextDay};
  },
  render: function() {
    var iconStyle={
      marginBottom: -8,
      marginRight: 23
    };
    var inputStyle={
      padding: '1px 0',
      marginTop: 48,
      backgroundColor: 'inherit',
      width: 170,
      fontSize: '1.2em',
      lineHeight: '19px',
      borderWidth: '0 0 2px',
      borderRadius: 0,
      borderColor: 'transparent transparent #c4c4c4',
    };
    return (
      <div className="bookForm">
        <form ref="bookForm" >
          <div>
            <span
              ref="nameImage"
              className="icon name_icon"
              style={{iconStyle}} />
            <input
              style={inputStyle}
              ref="bookName"
              type="text"
              placeholder="姓名" />
          </div>
          <div>
            <span
              ref="phoneImage"
              className="icon phone_icon"
              style={{iconStyle}} />
            <input
              style={inputStyle}
              ref="bookPhone"
              type="text"
              placeholder="联系电话" />
          </div>
          <div>
            <span
              ref="dateImage"
              className="icon calendar_icon"
              style={{iconStyle}} />
            <input
              style={inputStyle}
              ref="bookDate"
              type="date"
              defaultValue={this.state.userInput}
              placeholder="预约拍照日期" />
          </div>
            <div
              style={{
                width: 126,
                height: 37,
                marginTop: '54px',
                borderRadius: '30px',
                borderColor: '#3c3c3c',
                fontSize: '1.3334em',
                backgroundColor: 'inherit',
                color: '#3c3c3c'
              }}
              className="active-item"
              ref="bookButton">
              提交订单
            </div>
        </form>
      </div>
    );
  }
});

module.exports = BookForm;
