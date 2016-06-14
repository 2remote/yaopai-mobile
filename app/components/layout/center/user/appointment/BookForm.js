import React from 'react';
import validator from 'validator';
import Toaster from '../../../../Toast';
import WeUI from 'react-weui';
const { CellsTitle } = WeUI;

var BookForm = React.createClass({
  getDefaultProps: function () {
    var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10);
    return {userInput: nextDay};
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },
  render() {
    return (
      <div>
        <Toaster ref="toast"/>
        <CellsTitle>预约信息</CellsTitle>
        <form ref="bookForm" >
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">姓名</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="bookName" className="weui_input" type="text" placeholder="填写预约姓名" />
            </div>
          </div>
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">电话</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="phoneImage" className="weui_input" type="tel" pattern="[0-9]*" placeholder="填写预约电话" />
            </div>
          </div>
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">日期</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="bookDate" className="weui_input" defaultValue={this.props.userInput} type="date" placeholder="选择拍照日期" />
            </div>
          </div>

          <CellsTitle>备注</CellsTitle>
          <div className="weui_cell weui_panel bg_white">
            <div className="weui_cell_bd weui_cell_primary">
              <textarea ref="bookComment" maxLength="50" className="weui_textarea" placeholder="请输入评论" rows="3"/>
            </div>
          </div>

          <div className="weui_btn_area" onClick={this.handleSubmit} >
            <button type="button" className="weui_btn weui_btn_primary">{this.props.subValue}</button>
          </div>
        </form>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    // 获得用户输入
    const BuyerName     = this.refs.bookName.value.trim();
    const BuyerTel      = this.refs.phoneImage.value.trim();
    const AppointedTime = this.refs.bookDate.value.trim();
    const BuyerMemo     = this.refs.bookComment.value.trim();
    if (!BuyerName) {
      this.showMessage('请填写预约姓名');
      return;
    }
    if (!BuyerTel) {
      this.showMessage('请填写预约电话');
      return;
    }
    if (!validator.isMobilePhone(BuyerTel, 'zh-CN')) {
      this.showMessage('请输入正确的手机号');
      return;
    }
    if (+new Date(AppointedTime) < +new Date(this.props.userInput)) {
      this.showMessage('预约时间不能早于当前日期');
      return;
    }
    // console.log('预约信息', {BuyerName, BuyerTel, AppointedTime});

    // 网络存储
    this.props.onSubmit({BuyerName, BuyerTel, AppointedTime, BuyerMemo});
  }

});

export { BookForm as default };
