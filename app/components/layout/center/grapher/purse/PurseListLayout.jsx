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
    let accountDataList = [];
    let accountList;
    if(this.state.success) {
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

      //判断列表是否为空
      let isOrderNUll = true;
      for (let item of accountList) {
        if (item !== undefined) isOrderNUll = false;
      }
      //列表为空时渲染内容
      if (isOrderNUll) {
        accountList =
          <section className="text_center">
            <div style={{ padding:'50px 0px' }}>
              <i className="weui_icon_msg weui_icon_waiting"/>
              <p>暂无数据</p>
            </div>
          </section>
      }
    }
    return (
      <div>
        {this.state.success ? '' : <LoadingToast />}
        { accountList }
        <aside className="color_gray text_center font_small">
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