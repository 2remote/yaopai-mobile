import Reflux from 'reflux';
import UserFundActions from '../actions/UserFundActions';
import assert from 'assert';

var UserFundStore = Reflux.createStore({
  init: function() {
    // Id,Available,Frozen,TotalRevenue,Receivable,ErrorCode,ErrorMsg,Success
    this.data = {
      purse:{//摄影师钱包
        userId: '', // 用户ID
        Available: '', // 可提现余额
        Frozen : '', // 被冻结的金额(尚在提现中的资金会被冻结)
        TotalRevenue: '', // //收入总计
        Receivable: '' // 收款帐号
      },
      list: [{}],//摄影师账单流水
      hintMessage : '',
      success : false,
      flag : '',
      filterType: 'Completed',//默认展示选择“全部”栏数据
      checkingState: {
        send: '',
        receive: ''
      }
    };
    this.listenTo(UserFundActions.currentAccount.success, this.onCurrentAccountSuccess);
    this.listenTo(UserFundActions.currentAccount.failed, this.onFailed);

    this.listenTo(UserFundActions.recordsSearch.success, this.onRecordsSearchSuccess);
    this.listenTo(UserFundActions.recordsSearch.failed, this.onFailed);

    this.listenTo(UserFundActions.sendTelAccount.success, this.onSendTelAccountSuccess);
    this.listenTo(UserFundActions.sendTelAccount.failed, this.onFailed);

    this.listenTo(UserFundActions.receiveTelAccount.success, this.onReceiveTelAccountSuccess);
    this.listenTo(UserFundActions.receiveTelAccount.failed, this.onFailed);

    this.listenTo(UserFundActions.type,this.onType);
  },
  _fillData: function(data) {
    this.data.purse.userId = data.Id;
    this.data.purse.Available = data.Available;
    this.data.purse.Receivable = data.Receivable;
    this.data.purse.Frozen = data.Frozen;
    this.data.purse.TotalRevenue = data.TotalRevenue;

    this.data.list = data.Result;

    this.data.Success =  data.Success;
  },
  onCurrentAccountSuccess: function (data) {
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

  onRecordsSearchSuccess: function(data) {
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

  onSendTelAccountSuccess: function(data) {//后台发送验证码给用户
    if (data.Success) {
      this.data.hintMessage = '';
      this.data.checkingState.send = '验证码发送成功';
    } else {
      this.data.checkingState.send= data.ErrorMsg;
    }
    this.trigger(this.data);
  },

  onReceiveTelAccountSuccess: function(data) {//检查验证码是否正确
    if (data.Success) {
      this.data.hintMessage = '';
      this.data.checkingState.receive = '验证码正确';
    } else {
      this.data.checkingState.receive = '验证码错误';
    }
    this.trigger(this.data);
  },

  onFailed: function(data) {
    this.data.hintMessage = "网络出错啦！";
    this.trigger(this.data);
  },

  onType(filterType) {
    this.data.filterType = filterType;
    this.data.flag = 'type';
    this.trigger(this.data);
  }
});

export {UserFundStore as default};