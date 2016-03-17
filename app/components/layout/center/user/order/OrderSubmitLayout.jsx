import React from 'react';
import ReactMixin from 'react-mixin';
import Reflux from 'reflux';
import WeUI from 'react-weui';
import {Button} from 'react-weui';

import OrderActions from '../../../../../actions/OrderActions';
import OrderStore from '../../../../../stores/OrderStore';
import './style.scss';

let avatar= 'http://7xrgj5.com1.z0.glb.clouddn.com/35/009098bc-6d59-4443-93ec-3e9f4d5bb277.jpg?imageMogr2/auto-orient/gravity/Center/thumbnail/!78x78r/crop/78x78/interface/1';

const {Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter} = WeUI;

/**
 *
 */
class OrderSubmitLayout extends React.Component {
  //TODO: 点击提交订单后的事件
  submit = (e) => {
    alert('message');
  };

  constructor(props) {
    super(props);
    this.state = {
      order:{
        Albums:{},
        Photographer:{},
        CreationTime:'',
        PaymentTime:'',
        RefundTime:'',
        DeliveryTime:'',
        CompleteTime:''
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
      <div>
        <div className="weui_cells_title">套餐详情</div>

        <section className="weui_panel">
          <a href={`#/center/u/order/${order.Id}`} className="weui_media_box weui_media_appmsg">
            <div className="weui_media_hd">
              <img src={order.Albums.Cover} alt={order.Albums.Title} className="weui_media_appmsg_thumb"/>
            </div>
            <div className="weui_media_bd">
              <h4 className="weui_media_title">
                {order.Albums.Title}
              </h4>
              <p className="weui_media_desc">
                摄影师：{order.Photographer.NickName}
              </p>
            </div>
          </a>
          <i className="icon youjiantou top_right_icon "/>
        </section>

        <div className="weui_cells_title">预约信息</div>

        <section className="weui_panel">
          <div className="weui_cell">
            <div className="weui_cell_hd"><label className="yp_label">联系姓名</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="text" placeholder="您的昵称"/>
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_hd"><label htmlFor="tempInput" className="yp_label">联系电话</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="number" id="tempInput" pattern="[0-9]*" placeholder="手机号码"/>
            </div>
          </div>

          <div className="weui_cell">
            <div className="weui_cell_hd"><label className="yp_label">预约日期</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input className="weui_input" type="date" value=""/>
            </div>
          </div>
        </section>

        <div className="weui_cells_title">备注</div>

        <div className="weui_cell weui_panel">
          <div className="weui_cell_bd weui_cell_primary">
            <textarea className="weui_textarea" placeholder="请输入评论" rows="3"/>
            <div className="weui_textarea_counter"><span>0</span>/200</div>
          </div>
        </div>

        <div className="weui_btn_area">
          <Button onClick={this.submit} type="primary">提交订单</Button>
        </div>

        <section>
          <CellsTitle>文章列表</CellsTitle>
          <Cells access>
            <Cell className="list_item">
              <CellHeader>
                <img className="cover" src="http://mmrb.github.io/avatar/jf.jpg" alt=""/>
              </CellHeader>
              <CellBody>
                <h2 className="title">WeUI 发布——微信官方UI库</h2>
                <p className="desc">团队里的几个小伙子把微信里面web app的UI，按照设计规范给梳理了一遍，并将之开源了出来。</p>
              </CellBody>
              <CellFooter/>
            </Cell>
            <Cell className="list_item">
              <CellHeader>
                <img className="cover" src="http://mmrb.github.io/avatar/bear.jpg" alt=""/>
              </CellHeader>
              <CellBody>
                <h2 className="title">【纪念】服务器被删除了</h2>
                <p className="desc">因为没钱付服务器年费，所以一直都是月付，然后每个月服务器商会发来短信告诉我要缴费了。</p>
              </CellBody>
              <CellFooter/>
            </Cell>
          </Cells>
        </section>

      </div>
    );
  }
}

ReactMixin.onClass(OrderSubmitLayout, Reflux.listenTo(OrderStore, 'onOrderLoad'));

export {OrderSubmitLayout as default};
