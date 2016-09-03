import Reflux from 'reflux'
import UserFundActions from '../actions/UserFundActions'
import assert from 'assert'

var UserWithdrawal = Reflux.createStore({
  init: function() {
    // Id,Available,Frozen,TotalRevenue,Receivable,ErrorCode,ErrorMsg,Success
    this.data = {
      Withdrawal: {},
      hintMessage : '',
      success : false,
      flag : ''
    }

    this.listenTo(UserFundActions.withdrawalGet.success, this.onWithdrawalGet )
    this.listenTo(UserFundActions.withdrawalGet.failed, this.onFailed)
    this.listenTo(UserFundActions.withdrawalAdd.success, this.onWithdrawalAdd )
    this.listenTo(UserFundActions.withdrawalAdd.failed, this.onFailed)
  },

  onFailed: function(data) {
    this.data.hintMessage = "网络出错啦！"
    this.trigger(this.data)
  },

  onWithdrawalGet: function(data) {
    if (data.Success) {
      this.data.hintMessage = ''
      this.data.success = true
      this.data.Withdrawal = data
    } else {
      this.data.hintMessage = data.ErrorMsg
      this.data.success = false
    }
    this.trigger(this.data)
  },
  onWithdrawalAdd: function(data) {
    this.data.flag = 'add'
    if(data.Success) {
      this.data.hintMessage = ''
      this.data.success = true
    } else {
      this.data.hintMessage = data.ErrorMsg
      this.data.success = false
    }
    this.trigger(this.data)
  }
})

export {UserWithdrawal as default}