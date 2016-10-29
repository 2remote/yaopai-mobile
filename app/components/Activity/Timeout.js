import React from 'react'
import {Link} from 'react-router'
import './timeout.scss'

import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
import OrderActions from '../../actions/OrderActions'
import OrderStore from '../../stores/OrderStore'

class Timeout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lock: true,
      userInfo: {
        userType: '',
        userId: '',
      },
      time: {
        h: 0,
        m: 0,
        s: 0,
      },
    }

    this.onClose = this.onClose.bind(this)
  }

  getUserInfo(data) {
    if(data.flag !== 'currentUser') return
    this.setState({
      userInfo: {
        userType: data.userType,
        userId: data.userId,
      }
    })
    if(data.userId) OrderActions.orderOutSearch(50, 1, 'WaitingPayment')
  }

  getUserOrderList(data) {
    if(data.flag !== 'getUserOrderList' || !data.waitingPayment.length) return

    // 用户关闭后半小时之内不会再次提醒
    let newTimestamp = Date.parse(new Date())
    let oldTimestamp = + localStorage.timestamp
    if((newTimestamp - oldTimestamp) / 1000 < 1800) return

    let time = data.waitingPayment[0].ExpiringTime // 倒计时最新的订单
    if(time && this.state.userInfo.userType == 0 && this.state.lock) {
      this.setState({lock: false})
      let startTime = time.slice(0,10).replace(/-/g, "/")
      let endTime = time.slice(11, time.length - 4)

      const GetRTime = (startTime, endTime) => {
        let EndTime= new Date(`${startTime} ${endTime}`)
        let NowTime = new Date()
        let t = EndTime.getTime() - NowTime.getTime()

        let h = Math.floor(t/1000/60/60%24)
        let m = Math.floor(t/1000/60%60)
        let s = Math.floor(t/1000%60)

        this.setState({
          time: { h, m, s }
        })
      }

      setInterval(() => GetRTime(startTime, endTime),1000);
    } else {
      this.setState({lock: true})
    }
  }

  onClose() {
    this.setState({lock: true})
    localStorage.timestamp = Date.parse(new Date())
  }

  render() {
    const {h, m, s} = this.state.time
    if(h == 0 && m == 0 && s == 0) return <div></div>
    return (
      <section className={`timeout ${this.state.lock ? 'hide' : ''}`}>
        <div className="close fl" onClick={this.onClose}>
          <i className="icon close_icon" />
        </div>
        您的订单将于&nbsp;
        <strong>0{h}：</strong>
        <strong>{m < 10 ? `0${m}`: m}：</strong>
        <strong>{s <10 ? `0${s}` : s}</strong>
        &nbsp;后关闭
        <Link className="fr" to="/center/u/order">前往支付&nbsp;<i className="icon youjiantou" /></Link>
      </section>
    )
  }
}

ReactMixin.onClass(Timeout,Reflux.listenTo(UserStore, 'getUserInfo'))
ReactMixin.onClass(Timeout,Reflux.listenTo(OrderStore, 'getUserOrderList'))
export default Timeout
