import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import WeuiCells from '../../../../UI/WeuiCells';
import UserAvatarBox from '../../../../UserAvatarBox' ;
import HamburgMenu from'../../../../HamburgMenu';

import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';

let operationList = [{
  icon: 'order_icon',
  title: '账单',
  href: '/center/g/purse/detail'
}, {
  icon: 'wallet_icon',
  title: '提现',
  href: '/center/g/purse/withdraw'
}];

class PurseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceList: [{
        title: '账户余额',
        money: ''
      }],
      bindOpList: [{
        icon: 'zhifubao',
        title: '绑定支付宝',
        desc: '未绑定支付宝',
        href: '/center/g/purse/bind'
      }],
      user: {},
      fundData: {
        userId: '', // 用户ID
        Available: '', // 可提现余额
        Frozen : '', // 被冻结的金额(尚在提现中的资金会被冻结)
        TotalRevenue: '', // //收入总计
        Receivable: '', // 收款帐号
        ErrorCode: '',
        hintMessage: '',
        success: false
      }
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
      UserFundActions.currentAccount();
    }
  }
  onUserFundLoad(fundData) {
    this.setState({
      fundData,
      balanceList: [{
        title: '账户余额',
        money: fundData.purse.Available
      }],
      bindOpList: [{
        icon: 'zhifubao',
        title: '绑定支付宝',
        href: '/center/g/purse/bind',
        desc: `${fundData.Receivable?'已绑定支付宝':'未绑定支付宝'}`
      }]
    });
  }
  render() {
    return (
      <div>
        <HamburgMenu />
        <UserAvatarBox background={true} data={this.state.user}/>
        <WeuiCells cellList={this.state.balanceList} access={false} />
        <WeuiCells cellList={operationList} />
        <WeuiCells cellList={this.state.bindOpList} />
        <aside className="color_gray font_small footer">
          绑定支付宝账号后，即可提现。如充值或提现遇到特殊情况，请联系客服，或拨打0371-65337727帮助
        </aside>
      </div>
    );
  }
}

ReactMixin.onClass(PurseLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(PurseLayout, Reflux.listenTo(UserFundStore, 'onUserFundLoad'));

export default PurseLayout;
