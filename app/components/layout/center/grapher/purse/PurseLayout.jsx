import React from 'react';

class PurseLayout extends React.Component {
  render() {
    let ceshi = "http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1";
    return (
      <div>
        <header><img src={ceshi} alt=""/></header>

        <section className="weui_cells">
          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">
              <p>账户余额</p>
            </div>
            <div className="weui_cell_ft color_red">￥0.00</div>
          </div>
        </section>

        <section className="weui_cells weui_cells_access">
          <a className="weui_cell" href="javascript:;">
            <div className="weui_cell_bd weui_cell_primary">
              <p><i className="icon order_icon" />&nbsp;账单</p>
            </div>
            <div className="weui_cell_ft"></div>
          </a>
          <a className="weui_cell" href="javascript:;">
            <div className="weui_cell_bd weui_cell_primary">
              <p><i className="icon wallet_icon" />&nbsp;提现</p>
            </div>
            <div className="weui_cell_ft"></div>
          </a>
        </section>

        <section className="weui_cells weui_cells_access">
          <a className="weui_cell" href="javascript:;">
            <div className="weui_cell_bd weui_cell_primary">
              <p><i className="icon zhifubao" />&nbsp;绑定支付宝</p>
            </div>
            <div className="weui_cell_ft"><small className="font_small">未绑定支付宝</small></div>
          </a>
        </section>

        <aside className="color_gray font_small footer">
          绑定支付宝账号后，即可提现。如充值或提现遇到特殊情况，请联系客服，或拨打0371-65337727帮助
        </aside>
      </div>
    );
  }
}

export default PurseLayout;