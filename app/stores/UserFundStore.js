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
      list: [//摄影师账单流水
        {}
      ],
      hintMessage : '',
      success : false,
      flag : '',
      filterType: ''
      filterType: 'Completed'//默认展示选择“全部”栏数据
    };
    this.listenTo(UserFundActions.currentAccount.success, this.onCurrentAccountSuccess);
    this.listenTo(UserFundActions.currentAccount.failed, this.onFailed);

    this.listenTo(UserFundActions.recordsSearch.success, this.onRecordsSearchSuccess);
    this.listenTo(UserFundActions.recordsSearch.failed, this.onFailed);

    this.listenTo(UserFundActions.type,this.onType);
  },
  _fillData: function(data) {
    this.data.purse.userId = data.Id;
    this.data.purse.Available = data.Available;
    this.data.purse.Frozen = data.Frozen;
    this.data.purse.TotalRevenue = data.TotalRevenue;
    this.data.purse.Receivable = data.Receivable;

    this.data.list = data.Result;
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

  onRecordsSearchSuccess: function(data) {
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
  },

  onType(filterType) {
    this.data.filterType = filterType;
    this.data.flag = 'type';
    this.trigger(this.data);
  }
});

export {UserFundStore as default};