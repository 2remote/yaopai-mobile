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
 * order.payedAmount: 订单已付价格
 * @constructor
 */
const YPUIOrderCard = ({order}) => (

  <div>
    <section className="cardLeft">
      <div>
        <img src="" alt=""/>
        <span></span>
      </div>
      <p>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <button>支付</button>
      </p>
    </section>

    <section className="cardRight">

    </section>
  </div>
);

export default YPUIOrderCard;
