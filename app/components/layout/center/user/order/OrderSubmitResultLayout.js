import React from 'react';
import ReactMixin from 'react-mixin';
import Reflux from 'reflux';
import { Toast } from 'react-weui';
import OrderActions from '../../../../../actions/OrderActions';
import OrderStore from '../../../../../stores/OrderStore';

import CallActions from '../../../../../actions/CallActions';

class OrderSubmitResultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order:{
        AppointedTime: '',
        Albums:{},
        Photographer:{},
        CreationTime:'',
        PaymentTime:'',
        RefundTime:'',
        DeliveryTime:'',
        CompleteTime:'',
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
  showMessage(content) {
    this.refs.toast.show(content)
  }

  handleCall() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  render() {
    const {order} = this.state;
    return (
      <div>

        {/* 1. 预约提醒。The green stuff */}
        <div className="weui_panel weui_panel_access">
          <div className="weui_panel_bd">
            <a className="weui_media_box weui_media_appmsg bg_green color_white"
              href="javascript:void(0);" style={{ padding: "30px 15px" }}
            >
              <div className="weui_media_hd">
                <i className="icon success_icon" style={{
                  fontSize: '50px'
                }} />
              </div>
              <div className="weui_media_bd">
                <h4 className="weui_media_title">预约成功！</h4>
                <p className="weui_media_desc color_white">请尽快与摄影师取得联系获得更好服务！</p>
              </div>
            </a>
          </div>
        </div>
        {/* 2. 订单信息 */}
        <div className="weui_panel weui_panel_access">
          <div className="weui_panel_bd">
            <div href={`#/center/u/order/${order.Id}`} className="weui_media_box weui_media_appmsg">
              <div className="weui_media_hd">
                <img className="weui_media_appmsg_thumb"
                     src={order.Albums.Cover}
                     alt={order.Albums.Title}
                />
              </div>
              <div className="weui_media_bd">
                <h4 className="weui_media_title">{order.Albums.Title}</h4>
                <p className="weui_media_desc">{order.Albums.Description}</p>
              </div>
            </div>
          </div>
        </div>
        {/* 3. 预约信息 */}
        <div className="weui_cells weui_cells_form">
          <div className="weui_cell">
            <div className="weui_cell_hd">
              <label className="yp_label font_medium" style={{ width: '4em' }}>
                预约人
              </label>
            </div>
            <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
              {order.BuyerName}
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_hd">
              <label className="yp_label">预约日期</label>
            </div>
            <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
              {order.AppointedTime.substring(0,10)}
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_hd">
              <label className="yp_label">备注</label>
            </div>
            <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
              {order.BuyerMemo}
            </div>
          </div>
        </div>
        {/* 4. 包含服务 */}
        <div className="weui_cells weui_cells_form">
          <div className="weui_cell">
            <div className="weui_cell_hd">
              <label className="yp_label">摄影师昵称</label>
            </div>
            <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
              {order.Photographer.NickName}
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_hd">
              <label className="yp_label">包含服务</label>
            </div>
            <div className="weui_cell_bd weui_cell_primary font_medium color_gray">
              {order.Albums.Service || '无'}
            </div>
          </div>
        </div>

        <div style={{ padding: '15px 5px 5px'}}>
          <button onClick={ () => location.href='#/center/u' } className="weui_btn weui_btn_primary">
            返&nbsp;&nbsp;回
          </button>
        </div>
      </div>
    );
  }

}

ReactMixin.onClass(OrderSubmitResultLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));

export { OrderSubmitResultLayout as default };
