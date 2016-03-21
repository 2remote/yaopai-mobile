import React from 'react';

class PurseDetailLayout extends React.Component {
  render() {
    return (
      <div className="PurseDetailLayout">
        <header className="detail_header text_center">
          <i className="weui_icon_msg weui_icon_success"></i><br/>
          交易成功
        </header>
        <div className="weui_cells_title">账单详情</div>
        <article className="order-msg color_gray">
          <p>
            <span>交易金额：</span>
            <span className="color_red">￥999.00</span>
          </p>
          <p>
            <span>交易名称：</span>
            <span>少女写真</span>
          </p>
          <p>
            <span>预约客户：</span>
            <span>艾鹏而</span>
          </p>
          <p>
            <span>交易时间：</span>
            <span>2015-12-12&nbsp;21:10:12</span>
          </p>
          <p>
            <span>交易类型：</span>
            <span>收入</span>
          </p>
          <p>
            <span>交易单号：</span>
            <span>1fafafwa13313131</span>
          </p>
        </article>

        <aside className="footer text_center color_green">客服热线：0371-65337727</aside>
      </div>
    );
  }
}

export default PurseDetailLayout;
