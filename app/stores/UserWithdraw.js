import Reflux from 'reflux';
import UserFundActions from '../actions/UserFundActions';
import assert from 'assert';

var UserWithdrawal = Reflux.createStore({
  init: function() {
    // Id,Available,Frozen,TotalRevenue,Receivable,ErrorCode,ErrorMsg,Success
    this.data = {
      Withdrawal: {
        Id: '',
        Amount: '',
        State: '',
        CompletionTime: ''
      },
      hintMessage : '',
      success : false,
      flag : ''
    };

    this.listenTo(UserFundActions.withdrawalGet.success, this.onWithdrawalGet );
    this.listenTo(UserFundActions.withdrawalGet.failed, this.onFailed);
  },
  _fillData: function(data) {
    console.log(data);
    this.data.Withdrawal.Id = data.Id;
    this.data.Withdrawal.Amount = data.Amount;
    this.data.Withdrawal.State = data.State;
    this.data.Withdrawal.CompletionTime = data.CompletionTime;
  },

  onFailed: function(data) {
    this.data.hintMessage = "网络出错啦！";
    this.trigger(this.data);
  },

  onWithdrawalGet(data) {
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
  }
});

export {UserWithdrawal as default};