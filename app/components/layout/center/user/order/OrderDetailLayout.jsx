import React from 'react';

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import OrderActions from '../../../../../actions/OrderActions';
import OrderStore from '../../../../../stores/OrderStore';

import {Button} from 'react-weui';

class OrderDetailLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      order:{
        Albums:{},
        Photographer:{},
      }
    };
  }

	componentDidMount() {
    OrderActions.get(this.props.params.id);
	}

  onOrderLoad(data) {
    this.setState({
      order: data.order
    })
  }

  render() {
    const {order} = this.state;
    return (
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
				    <span>{order.Albums.Title}</span>
			    </p>
			    <p>
				    <span>预约摄影师：</span>
				    <span>{order.Photographer.NickName}</span>
			    </p>
			    <p>
				    <span>创建时间：</span>
				    <span>{order.CreationTime}</span>
			    </p>
          <p className={order.PaymentTime || 'hide'}>
            <span>付款时间：</span>
            <span>{order.PaymentTime}</span>
          </p>
          <p>
            <span>退款时间：</span>
            <span>{order.RefundTime}</span>
          </p>
          <p>
            <span>发片时间：</span>
            <span>{order.DeliveryTime}</span>
          </p>
          <p>
            <span>成交时间：</span>
            <span>{order.CompleteTime}</span>
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
  }
}

ReactMixin.onClass(OrderDetailLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));

export default OrderDetailLayout;
