import React from 'react';

const OrderRefundLayout = () => (
  <div className="container">
		<header className="user-msg">
			<p>订单编号:adadaf3q2e3q3</p>
			<p>交易日期:2014-12-31</p>
			<p>
				<img src="" alt=""/>
				<span>
					少女写真(闺蜜组)<br/>
					摄影师:糖包<br/>
					总金额:￥2323
				</span>
			</p>
		</header>

		<article className="refund-msg">
			<p>退款方式  原路返回(3~10个工作日完成,暂不收手续费)</p>
			<p>提款金额 1267元(优惠不可退)</p>
			<p>
				退款原因
				<select>
					<option value="volv1">不想拍了</option>
					<option value="saab">摄影师档期问题</option>
					<option value="opel">计划有变没时间消费</option>
					<option value="audi">其他原因</option>
				</select>
			</p>
			<p>备注<textarea rows="3" cols="20"></textarea></p>
		</article>

		<footer>
			<button>提交申请</button>
			<aside>
				退款说明：
				A、未拍摄前：<br/>
				1、约定拍摄日期前3（具体日期待定）天以上，申请修改拍摄档期和申请退款，均不扣款，平台保障，放心支付。<br/>
				2、约定拍摄日的前3天内，如临时改期，将扣取订单总价的10%，作为摄影师档期占用补偿。申请退款将扣去订单总价的30%作为毁约补偿。<br/>
				B、拍摄完成后：<br/>
				如用户对拍摄作品不满意，如需申请退款，务必先联系客服人员，然后提交退款原因说明及上传凭证图片，经过YAOPAI 初步确认后，由工作人员为您办理退款（作品如何评判？退多少？退款标准如何定？）或提供补救方案。<br/>

				退款规则：
				1、若办理退款，退款会优先使用您原订单的支付方式进行退回。<br/>
				2、如果所支付的订单中含有非现金部分(如优惠券)，在退款时，非现金部分不能折现。<br/>
				3、如有疑问，请拨打客服热线： 400-888-8888
			</aside>
		</footer>
	</div>
);

export default OrderRefundLayout;