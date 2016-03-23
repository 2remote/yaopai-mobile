import React from 'react';
import {Button} from 'react-weui';

class WithdrawDeposit extends React.Component {
  render() {
    return (
      <div>
        <div className="weui_cells_title">绑定支付宝</div>
        <div className="weui_cells">
          <div className="weui_cell weui_cells_form">
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入支付宝账号" />
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入手机验证码" />
            </div>
            <div className="weui_cell_ft">
              <a className="color_green font_medium" href="javascript:;">获取验证码</a>
            </div>
          </div>
        </div>

        <footer className="footer" style={{paddingTop:40, paddingBottom:0}}>
          <Button type="primary">提交绑定</Button>
        </footer>

        <aside className="footer color_gray font_small">
          <p className="font_medium">注意：</p>
          <ul>
            <li>1.此账户为YAOPAI平台与您进行现金结算的通道此账户为YAOPAI平台与您进行现金结算的通道。</li>
            <li>2.请确认支付宝及姓名为本人使用账户。</li>
            <li>3.为确保您的资金安全，如需解绑账户，请联系人工客服认证。客服电话0371-65337727。
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default WithdrawDeposit;