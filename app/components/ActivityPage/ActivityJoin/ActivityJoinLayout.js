import React from 'react'
import $ from 'jquery'

import ActivityActions from '../../../actions/ActivityActions'

import { Link } from 'react-router'

class ActivityJoinLayout extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      tel : '',
      gender : 1,
      remark : ''
    }
  }

  // 修改姓名
  _handleChangeName(e) {
    this.setState({
      name : e.target.value,
    })
  }

  // 修改电话
  _handleChangeTel(e) {
    this.setState({
      tel : e.target.value,
    })
  }

  // 修改备注
  _handleChangeRemark(e) {
    this.setState({
      remark : e.target.value,
    })
  }

  // 修改性别女
  _handleChangeW(e) {
    this.setState({
      gender : 0,
    })
  }

  // 修改性别男
  _handleChangeM(e) {
    this.setState({
      gender : 1,
    })
  }

  _verify(data){
    if(data.name === ''){
      alert('姓名不能为空')
      return false
    }else if(data.tel === ''){
      alert('手机号不能为空')
      return false
    }
    ActivityActions.add(data)
  }

  _handleSubmit() {
    let data = this.state
    data.id = this.props.source.id
    this._verify(data)
  }

  hide(e) {
    this.props.hideJoinPage()
  }

  render() {
    return (
      <div className="ac-masks" >
        <div className="ac-join">
          <h1>YAOPAI活动报名</h1>
          <div className="ac-inputGroup">
            <input className="ac-input" type="text" onChange={this._handleChangeName.bind(this)} placeholder="填写姓名" />
          </div>
          <div className="ac-inputGroup">
            <input className="ac-input" type="tel" onChange={this._handleChangeTel.bind(this)} placeholder="填写手机号码" />
          </div>
          <div className="ac-inputGroup">
            <p>性别</p>
            <input className="ac-radio" name="gender" defaultChecked onClick={this._handleChangeM.bind(this)} type="radio" />&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;
            <input name="gender" className="ac-radio" onClick={this._handleChangeW.bind(this)} type="radio" />&nbsp;&nbsp;女
          </div>
          <div className="ac-inputGroup">
            <textarea className="ac-input" rows="2" placeholder="备注" onChange={this._handleChangeRemark.bind(this)}></textarea>
          </div>
          <a className="ac-submit" onClick={this._handleSubmit.bind(this)}>提交报名</a>
        </div>

        <a className="ac-close" onClick={this.hide.bind(this)}>X</a>
      </div>
    )
  }
}

export default ActivityJoinLayout