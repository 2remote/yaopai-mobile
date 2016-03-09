import React from 'react';
import '../css/OrderSubmitLayout.scss';
let avatar= 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1';

const OrderSubmitLayout = () => (
  <div className="OrderSubmitLayout">
		<header>
			<h3>当前订单</h3>
			<img src={avatar} alt=""/><br/>
			<span>少女写真(闺蜜组)</span>
		</header>

		<article className="submitBox">
			<p>
				<i className="icon grapher_icon" />
				<input type="text"/>
			</p>
			<p>
				<i className="icon grapher_icon" />
				<input type="text"/>
			</p>
			<p>
				<i className="icon grapher_icon" />
				<input type="text"/>
			</p>
			<p>
				<i className="icon grapher_icon" />
				<input type="text"/>
			</p>

			<button>提交订单</button>
		</article>
	</div>
);

export default OrderSubmitLayout;