import React from 'react';
import {Button, Dialog} from 'react-weui';
const {Confirm} = Dialog;
import WeuiCells from '../../../../UI/WeuiCells';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import UserActions from '../../../../../actions/UserActions';
import UserStore from '../../../../../stores/UserStore';
import UserFundActions from '../../../../../actions/UserFundActions';
import UserFundStore from '../../../../../stores/UserFundStore';

class CardDetailLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bindOpList: [{
        icon: 'zhifubao',
        title: '支付宝账号',
        desc: ''
      }],
      confirm: {
        show: false,
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: this.hideConfirm
          },
          {
            type: 'primary',
            label: '确定',
            onClick: this.jumpBind
          }
        ]
      }
    }
  }

  componentDidMount() {
    UserActions.currentUser();
  }

  onUserLoad(user) {
    if(!user.isLogin){ // 用户未登录，跳转登录页
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    } else {
      UserFundActions.currentAccount();//获取当前用户帐户信息
    }
  }

  onUserFundLoad(data) {
    this.setState({
      bindOpList: [{
        icon: 'zhifubao',
        title: '支付宝账号',
        desc: data.purse.Receivable
      }]
    });
  }

  render() {
    return(
      <div>
        <Confirm
          show={this.state.showConfirm}
          title={this.state.confirm.title}
          buttons={this.state.confirm.buttons}>
          确定更改支付宝账户吗？
        </Confirm>

        <div className="weui_cells_title">支付宝账号详情</div>
        <WeuiCells cellList={this.state.bindOpList}  access={false} />

        <footer className="footer" style={{paddingTop:40, paddingBottom:0}}>
          <Button type="disabled" onClick={this.showConfirm}>更改账户</Button>
        </footer>

        <aside className="footer color_gray font_small">
          <p className="font_medium">注意：</p>
          <ul>
            <li>1.此账户为YAOPAI平台与您进行现金结算的通道此账户为YAOPAI平台与您进行现金结算的通道。</li>
            <li>2.请确认支付宝及姓名为本人使用账户。</li>
            <li>3.为确保您的资金安全，如需解绑账户，请联系人工客服认证。客服电话
              <a className="color_green" href="tel:0371-65337727">0371-65337727</a>。
            </li>
          </ul>
        </aside>
      </div>
    );
  }

  jumpBind = (e) => {//跳转到绑定支付宝页面
    this.setState({showConfirm: false});
    this.history.pushState(null, 'center/g/purse/bind');
  };

  showConfirm = (e) => {
    this.setState({showConfirm: true});
  };

  hideConfirm = (e) => {
    this.setState({showConfirm: false});
  };
}

ReactMixin.onClass(CardDetailLayout, Reflux.listenTo(UserFundStore, 'onUserFundLoad'));
ReactMixin.onClass(CardDetailLayout, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(CardDetailLayout, History);

export default CardDetailLayout;
