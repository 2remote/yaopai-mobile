import React from 'react';

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
	<div className="weui_panel weui_panel_access">
    <div className="weui_panel_bd">
      <a className="weui_media_box weui_media_appmsg">
        <div className="weui_media_hd">
          <img className="weui_media_appmsg_thumb" src={order.grapher.avatar} alt/>
        </div>
        <div className="weui_media_bd">
          <h4 className="weui_media_title">
            {order.title}
          </h4>
          <p className="weui_media_desc">
            <i className="icon font_small book_icon ">&nbsp;&nbsp;</i>
            预约时间：{order.time}
          </p>
          <p className="weui_media_desc">
            <i className="icon font_small price_icon">&nbsp;&nbsp;</i>
            价格：￥{order.price}
            &nbsp;&nbsp;&nbsp;
            实付：<span className="color_red">￥{order.payedAmount}</span>
          </p>
        </div>
        <i className="icon youjiantou top_right_icon color_gray"></i>
        {/*<i className="icon close_icon top_right_icon color_gray"></i>*/}
      </a>
    </div>
    {/*某一天需要分离出这个分割线的话，就做成单独的UI Component*/}
    <hr className="separator" />
    {/* 代付款 */}
    <div className="weui_panel_bd">
      <div className="yp_media_box">
        <div>
          <a href={`tel:${order.grapher.phone}`} className="color_gray">
            <i className="icon phone_icon" />
            联系{order.grapher.name}
          </a>
        </div>
        <div className="flex_spring"></div>
        <div>
          <button className="weui_btn weui_btn_mini weui_btn_primary">
            去支付
          </button>
        </div>
      </div>
    </div>
    {/* 待确认 */}
    <div className="weui_panel_bd">
      <div className="yp_media_box">
        <div>
          <a href={`tel:${order.grapher.phone}`} className="color_gray">
            <i className="icon phone_icon" />
            联系{order.grapher.name}
          </a>
        </div>
        <div className="flex_spring"></div>
        <div>
          <button className="weui_btn weui_btn_mini weui_btn_default">
            退款
          </button>
        </div>
      </div>
    </div>
    {/* 进行中 */}
    <div className="weui_panel_bd">
      <div className="yp_media_box">
        <div>
          <a href={`tel:${order.grapher.phone}`} className="color_gray">
            <i className="icon phone_icon" />
            联系{order.grapher.name}
          </a>
        </div>
        <div className="flex_spring"></div>
        <div>
          <button className="weui_btn weui_btn_mini weui_btn_default">
            退款
          </button>
          <span>&nbsp;&nbsp;</span>
          <button className="weui_btn weui_btn_mini weui_btn_primary">
            &nbsp;&nbsp;收片&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </div>
    {/* TODO: 已完成 */}
    {/* 已关闭 */}
    <div className="weui_panel_bd">
      <div className="yp_media_box">
        <div>
          <a href={`tel:${order.grapher.phone}`} className="color_gray">
            <i className="icon phone_icon" />
            联系{order.grapher.name}
          </a>
        </div>
        <div className="flex_spring"></div>
        <div>
          <span className="color_gray">已取消订单</span>
          <span className="color_red">退款成功</span>
          <span className="color_green">已完成</span>
        </div>
      </div>
    </div>
  </div>
);

export {YPUIOrderCard as default};
