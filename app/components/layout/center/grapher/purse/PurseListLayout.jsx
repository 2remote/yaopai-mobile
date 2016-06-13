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
    if(!user.isLogin){ // 用户未登录，跳转登录页
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
    let accountDataList, accountList;
    if(this.state.success) {
      accountDataList = WhichAccount(this.state.filterType, this.state.list);
      //列表为空时渲染内容
      if (!accountDataList.length) {
        accountList =
          <section className="text_center">
            <div style={{ padding:'50px 0' }}>
              <i className="weui_icon_msg weui_icon_waiting"/>
              <p>暂无数据</p>
            </div>
          </section>
      } else {
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
    }
    return (
      <div>
        {this.state.success ? '' : <LoadingToast />}
        { accountList }
        <aside className="footer color_gray text_center font_small">
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
