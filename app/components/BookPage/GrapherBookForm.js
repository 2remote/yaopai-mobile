import React from 'react';

var BookForm = React.createClass({
  getInitialState: function() {
    var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10);
    return {userInput: nextDay};
  },
  render: function() {
    var iconStyle={
      marginBottom: -8,
      marginRight: 23,
      fontSize: 55
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
              style={iconStyle}
              ref="nameImage"
              className="icon name_icon" />
            <input 
              style={inputStyle}
              ref="bookName"
              type="text" 
              placeholder="填写预约姓名" />
          </div>
          <div>
            <span 
              style={iconStyle}
              ref="phoneImage"
              className="icon phone_icon" />
            <input 
              style={inputStyle}
              ref="bookPhone"
              type="text" 
              placeholder="填写预约电话" />
          </div>
          <div>
            <span 
              style={iconStyle}
              ref="dateImage"
              className="icon calendar_icon" />
            <input 
              style={inputStyle}
              ref="bookDate"
              type="date" 
              defaultValue={this.state.userInput}
              placeholder="选择拍照日期" />
          </div>
          <Link to="grapher_book_success_dialog">
            <input 
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
              ref="bookButton"
              type="submit" value="提交订单" />
            </Link>
        </form>
      </div>
    );
  }
});

export {BookForm as default};
