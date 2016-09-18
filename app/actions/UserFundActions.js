import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var UserFundActions = Reflux.createActions({
  'currentAccount': {children: ['success', 'failed']},
  'recordsSearch': {children: ['success', 'failed']},
  'withdrawalGet': {children: ['success', 'failed']},
  'sendTelAccount': {children: ['success', 'failed']},
  'receiveTelAccount': {children: ['success', 'failed']},
  'withdrawalAdd': {children: ['success', 'failed']},
  'getUserToken' : {children:['success', 'failed']},
  'type': {}
})

UserFundActions.currentAccount.listen(function() {
  var data = {
    Fields: 'Id,Available,Frozen,TotalRevenue,Receivable'
  }
  HttpFactory.post(API.USERFUND.currentAccount,data,this.success,this.failed)
})

UserFundActions.recordsSearch.listen(function() {
  var data = {
    Fields: 'Id,Amount,CreationTime,AssociatedId,FundsType'
  }
  HttpFactory.post(API.USERFUND.recordsSearch,data,this.success,this.failed)
})

UserFundActions.withdrawalGet.listen(function(id) {
  var data = {
    Id: id,
    Fields: 'Id,Amount,State,CompletionTime'
  }
  HttpFactory.post(API.USERFUND.withdrawalGet,data,this.success,this.failed)
})

UserFundActions.sendTelAccount.listen(function() {
  var data = {}
  HttpFactory.post(API.USERFUND.sendTelAccount,data,this.success,this.failed)
})

UserFundActions.receiveTelAccount.listen(function(Code, Receivable) {
  var data = {
    Code: Code,
    Receivable: Receivable
  }
  HttpFactory.post(API.USERFUND.receiveTelAccount,data,this.success,this.failed)
})

UserFundActions.withdrawalAdd.listen(function(amount) {
  var data = {
    Amount: amount
  }
  HttpFactory.post(API.USERFUND.withdrawalAdd,data,this.success,this.failed)
})

/*得到用户上传头像时的 token*/
UserFundActions.getUserToken.listen(function (data) {
  var data = {}
  HttpFactory.post(API.FILE.getToken, data, this.success, this.failed)
})

export {UserFundActions as default}
