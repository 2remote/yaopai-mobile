import Reflux from 'reflux';
import UserFundActions from '../actions/UserFundActions';
import assert from 'assert';

var UserFundStore = Reflux.createStore({
  init: function() {
    // Id,Available,Frozen,TotalRevenue,Receivable,ErrorCode,ErrorMsg,Success
    this.data = {
      userId: '', // 用户ID
      Available: '', // 可提现余额
      Frozen : '', // 被冻结的金额(尚在提现中的资金会被冻结)
      TotalRevenue: '', // //收入总计
      Receivable: '', // 收款帐号
      ErrorCode: '',
      hintMessage: '',
      success: false
    };
    this.listenTo(UserFundActions.currentAccount.success, this.onCurrentAccountSuccess);
    this.listenTo(UserFundActions.currentAccount.failed, this.onFailed);
  },
  _fillData: function(data) {
    this.data.userId = data.Id;
    this.data.Available = data.Available;
    this.data.Frozen = data.Frozen;
    this.data.TotalRevenue = data.TotalRevenue;
    this.data.Receivable = data.Receivable;
  },
  onCurrentAccountSuccess: function (data) {
    this.data.flag = 'resetPassword';
    if (data.Success) {
      this.data.hintMessage = '';
      this.data.success = true;
      this._fillData(data);
    } else {
      this.data.hintMessage = data.ErrorMsg;
      this.data.success = false;
    }
    this.trigger(this.data);
  },
  onFailed: function(data) {
    this.data.hintMessage = "网络出错啦！";
    this.trigger(this.data);
  }
});

export {UserFundStore as default};