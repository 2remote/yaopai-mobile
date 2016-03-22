import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var UserFundActions = Reflux.createActions({
  'currentAccount': {children: ['success', 'failed']},
  'recordsSearch': {children: ['success', 'failed']}
});

UserFundActions.currentAccount.listen(function() {
  var data = {
    Fields: 'Id,Available,Frozen,TotalRevenue,Receivable'
  };
  HttpFactory.post(API.USERFUND.currentAccount,data,this.success,this.failed);
});

UserFundActions.recordsSearch.listen(function() {
  var data = {
    Fields: 'Id,Amount,CreationTime,AssociatedId,FundsType'
  };
  HttpFactory.post(API.USERFUND.recordsSearch,data,this.success,this.failed);
});

export {UserFundActions as default};
