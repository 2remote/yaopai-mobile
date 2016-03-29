import React from 'react';
import {LoadingToast} from '../../../../UI/WeuiToast';

import { History } from 'react-router';
import { WhichAccount } from '../../../../Tools';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';

import YPUIPurseCard from '../../../../UI/YPUIPurseCard.jsx';

 /*
  Id: 2,  //Id
  Amount: 33.33, //正负金额
  CreationTime: "0001-01-01T00:00:00",    //创建时间
  AssociatedId: "123543653",    //关联Id
  FundsType: "Order", //用户流水类型 , 详情见备注
 */

class PurseListLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      filterType: 'Completed',
      list: [],
      hintMessage : '账单加载中。。。',
      success : false
    };
  }
  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登陆页
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      this.setState({ user });
      // 获取用户fund信息
      UserFundActions.recordsSearch();
    }
  }
  onUserFundLoad(account) {
    this.setState({
      filterType: account.filterType,
      list: account.list,
      hintMessage : account.hintMessage,
      success : account.success
    });
  }

  render() {
    let accountList;
    let accountDataList = [];
    if(!this.state.success) {
      accountList = <LoadingToast />;
    } else {
      accountDataList = WhichAccount(this.state.filterType, this.state.list);
      accountList = accountDataList.map((account, index) => {
        return <YPUIPurseCard
                  Amount={account.Amount}
                  CreationTime={account.CreationTime}
                  FundsType = {account.FundsType}
                  Id = {account.AssociatedId}
                  key={index}
              />;
      });
    }
    return (
      <div>
        { accountList }
        <aside
          style={{
            padding: '20px 15px 10px',
            fontSize: '12px'
          }}
          className="color_gray text_center">
          温馨提示：交易过程中如有异常<br />
          请拨打客服热线：<a className="color_green" href="tel:0371-65337727">0371-65337727</a>
        </aside>
      </div>
    );
  }
}

ReactMixin.onClass(PurseListLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(PurseListLayout, Reflux.listenTo(UserFundStore, 'onUserFundLoad'));
ReactMixin.onClass(PurseListLayout, History);

export default PurseListLayout;