import React from 'react';
import {Button} from 'react-weui';

const OrderDetailLayout = () => (
  <div className="OrderDetailLayout">
		<div className="weui_cells_title">支付流程说明</div>
		<section className="icon_box font_small color_gray">
			<span><i className="icon phone" /><br/>提单
			</span><span><i className="icon phone" /><br/>付款
			</span><span><i className="icon phone" /><br/>拍摄
			</span><span><i className="icon phone" /><br/>收片</span>
		</section>
		<div className="weui_cells_title">订单详情</div>

    <article className="order-msg color_gray">
			<p>
				<span>预约服务：</span>
				<span>少女写真（闺蜜组）</span>
			</p>
			<p>
				<span>预约摄影师：</span>
				<span>少女写真（闺蜜组）</span>
			</p>
			<p>
				<span>拍摄日期：</span>
				<span>少女写真（闺蜜组）</span>
			</p>
			<p>
				<span>预约姓名：</span>
				<span>少女写真（闺蜜组）</span>
			</p>
			<p>
				<span>预约电话：</span>
				<span>少女写真（闺蜜组）</span>
			</p>
			<p>
				<span>备注：</span><span>测测字测试文字测试文字测试测试文字测试文字测试测试文字测试文字测试文字</span>
			</p>
		</article>

		<div className="add_up color_gray fr">
			合计：<span className="font_super color_dark">￥1279</span>
		</div>
		<footer>
			<Button type="primary">支付￥1279</Button>
		</footer>
	</div>
);

export default OrderDetailLayout;
