import React from 'react';
import './css/YPUIOrderCard.scss';

/**
 * 本component是个人中心中订单的UI组件,用于展示不同状态的订单UI
 * @param order: 订单信息,包含以下内容:
 * order.id: 订单ID
 * order.status: 订单状态,分为:
 * order.userId: 订单-用户ID
 * order.grapher.id: 订单-摄影师ID
 * order.grapher.avatar: 订单-摄影师头像
 * order.grapher.name: 订单-摄影师昵称
 * order.grapher.phone: 订单-摄影师电话号码
 * order.title: 订单标题
 * order.time: 预约时间
 * order.price: 订单价格
 * order.payedAmount: 订单实付价格
 * @constructor
 */


const YPUIOrderCard = ({order}) => (
  <div className="YPUIOrderCard">
    <article className="container-header">
      <section className="order-face">
        <img src={order.grapher.avatar} />

      </section><section className="order-msg">
        <div className="order-title">
          <span>{order.title}</span>
        </div>
        <div className="order-detail">
          <i className="icon grapher_icon" />预约时间：{order.time}
        </div>
        <div className="order-detail">
          <i className="icon grapher_icon" />价格：{order.price}
          <p className="fr">实付：￥<span className="prominent">{order.payedAmount}</span></p>
        </div>

      </section><section className="order-close">
        <i className="icon grapher_icon close-order" />
      </section>
    </article>

    <article className="container-footer">
      <p>
        <i className="icon grapher_icon" /><span>联系{order.grapher.name}</span>
      </p>
      <a href="javascript:;" className="fr weui_btn weui_btn_mini weui_btn_primary">去支付</a>
    </article>
  </div>
);

const YPUIOrderAside = () => (
  <aside className="YPUIOrderAside">
    <p>温馨提示：交易过程中如有异常</p>
    <p>请拨打客服热线：0371-65337727</p>
  </aside>
);

export {YPUIOrderCard, YPUIOrderAside};
