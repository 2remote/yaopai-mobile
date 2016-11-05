import React from 'react'
import validator from 'validator'
import Toaster from '../../../../Toast'
import { Dialog, CellsTitle} from 'react-weui'

const {Alert} = Dialog

import './index.scss'

const BookForm = React.createClass({
  getInitialState : function () {
    return {
      agree: false,
      showAlert: false,
      alert: {
        title: '退款说明',
        buttons: [
          {
            label: '好的',
            onClick: this.hideAlert
          }
        ]
      },
    }
  },

  getDefaultProps: function () {
    var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10)
    return {userInput: nextDay}
  },
  showMessage: function (content) {
    this.refs.toast.show(content)
  },

  showAlert(){
    this.setState({showAlert: true});
  },

  hideAlert(){
    this.setState({showAlert: false});
  },

  handleAgree: function(e) {
    let agree = e.target.checked
    this.setState({agree});
  },

  render() {
    return (
      <div>
        <Toaster ref="toast"/>
        <CellsTitle>预约信息</CellsTitle>
        <form ref="bookForm" >
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">姓名</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="bookName" className="weui_input" type="text" placeholder="填写预约姓名" />
            </div>
          </div>
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">电话</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="phoneImage" className="weui_input" type="number" pattern="[0-9]*" placeholder="填写预约电话" />
            </div>
          </div>
          <div className="weui_cell bg_white">
            <div className="weui_cell_hd"><label className="weui_label">日期</label></div>
            <div className="weui_cell_bd weui_cell_primary">
              <input ref="bookDate" className="weui_input" defaultValue={this.props.userInput} type="date" placeholder="选择拍照日期" />
            </div>
          </div>

          <CellsTitle>备注</CellsTitle>
          <div className="weui_cell weui_panel bg_white">
            <div className="weui_cell_bd weui_cell_primary">
              <textarea ref="bookComment" maxLength="50" className="weui_textarea" placeholder="请输入备注" rows="3"/>
            </div>
          </div>

          <div style={{paddingLeft: '15px', fontSize: '12px'}}>
            <input type="checkbox" checked={this.state.agree} onChange={this.handleAgree} />
            阅读并接受
            <span style={{color: '#04be02'}} onClick={this.showAlert}>《YAOPAI服务保障及退款说明》</span>
          </div>

          <Alert
            show={this.state.showAlert}
            title={this.state.alert.title}
            buttons={this.state.alert.buttons}
          >
                 <strong>A.摄影师未接单：</strong><br/>
                 用户提交订单付款后，并且在摄影师未接单的情况下，如果此时申请退款，均不扣款，平台保障，放心支付。<br/>
                 <strong>B.摄影师已接单但还未拍摄：</strong><br/>
                   1.约定拍摄日期前 7 天以上，申请退款，均不扣款，平台保障，放心支付。<br/>
                   2.距约定拍摄日 7 天以内申请退款时，YAOPAI 平台将根据实际情况扣去订单已付款的 0-30% 作为毁约补偿。<br/>
                 <strong>C.拍摄完成后：</strong><br/>
                 如用户对拍摄作品不满意，如需申请退款，务必先联系客服人员，说明退款原因及上传凭证图片，经过 YAOPAI 初步确认后，由工作人员为您办理退款或提供补救方案。<br/>
                 <strong>退款规则：</strong><br/>
                 1.若办理退款，退款会优先使用您原订单的支付方式进行退回；<br/>
                 2.如果所支付的订单中含有非现金部分(如优惠券)，在退款时，非现金部分不能折现；<br/>
                 3.如有疑问，请拨打客服热线： <a className="color_green" href="tel:400-876-5981">400-876-5981</a>
           </Alert>

          <div className="weui_btn_area" onClick={this.state.agree ? this.handleSubmit : null} style={{marginTop: '8px'}}>
            <button type="button" className={`weui_btn ${this.state.agree ? 'weui_btn_primary' : 'weui-btn_disabled'}`}>{this.props.subValue}</button>
          </div>
        </form>
      </div>
    )
  },
  handleSubmit: function(e) {
    e.preventDefault()
    // 获得用户输入
    const BuyerName     = this.refs.bookName.value.trim()
    const BuyerTel      = this.refs.phoneImage.value.trim()
    const AppointedTime = this.refs.bookDate.value.trim()
    const BuyerMemo     = this.refs.bookComment.value.trim()
    const telPattern = /^1[34578]\d{9}$/
    if (!BuyerName) {
      this.showMessage('请填写预约姓名')
      return
    }
    if (!BuyerTel) {
      this.showMessage('请填写预约电话')
      return
    }
    if (!telPattern.test(BuyerTel)) {
      this.showMessage('请输入正确的手机号')
      return
    }
    if (+new Date(AppointedTime) < +new Date(this.props.userInput)) {
      this.showMessage('预约时间不能早于当前日期')
      return
    }
    // console.log('预约信息', {BuyerName, BuyerTel, AppointedTime});

    // 网络存储
    this.props.onSubmit({BuyerName, BuyerTel, AppointedTime, BuyerMemo})
  }

})

export { BookForm as default }
