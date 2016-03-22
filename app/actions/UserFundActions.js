import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var UserFundActions = Reflux.createActions({
  'currentAccount': {children: ['success', 'failed']}
});

UserFundActions.currentAccount.listen(function() {
  var data = {
    Fields: 'Id,Available,Frozen,TotalRevenue,Receivable'
  };
  HttpFactory.post(API.USERFUND.currentAccount,data,this.success,this.failed);
});

export {UserFundActions as default};