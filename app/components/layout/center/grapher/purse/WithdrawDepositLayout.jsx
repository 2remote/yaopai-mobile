import React from 'react';
import {Button} from 'react-weui';

class BindCard extends React.Component {
  render() {
    return (
      <div>
        <div className="weui_cells_title">提现</div>
        <div className="weui_cells">
          <div className=" weui_cell">
            <div className="weui_cell_bd weui_cell_primary">
              <p>可提余额</p>
            </div>
            <div className="weui_cell_ft color_red">￥0.00</div>
          </div>

          <div className="weui_cell weui_cells_form">
            <div className="weui_cell_hd"><label className="yp_label_fix">金额（元）</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="number" pattern="[0-9]*" placeholder="请输入提现的金额" />
            </div>
          </div>
        </div>

        <footer className="footer" style={{paddingTop:40, paddingBottom:0}}>
          <Button type="primary">确&nbsp;&nbsp;定</Button>
        </footer>

        <aside className="footer color_gray font_small text_center">
          温馨提示：提现至您绑定的支付宝账号中，如您未绑定支付宝账号，请您先进行绑定再进行提现<br/>
          <a className="color_green  font_medium">绑定支付宝<i className="icon youjiantou" /></a>
        </aside>
      </div>
    );
  }
}

export default BindCard;