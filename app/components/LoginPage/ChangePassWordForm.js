import React from 'react'
import Reflux from 'reflux'
import InputGroup from '../UI/InputGroup'
import { ButtonBlock } from '../UI/Button'
import DocumentTitle from 'react-document-title'
import Toaster from '../Toast'
import {History} from 'react-router'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

var ChangePassWordForm = React.createClass({
  mixins: [Reflux.listenTo(UserStore, '_onPdSubmit'),History],
  getInitialState: function () {
    return {
      newPassword: '',
      confirmPassword: '',
    }
  },
  _onPdSubmit: function (data) {
    console.log(data)
    if (data.flag == 'resetPassword') {
      if (data.hintMessage) {
        this.showMessage(data.hintMessage)
        return
      } else {
        this.showMessage('修改成功，请登录')
        this.history.pushState(null, '/login_page')
      }
    }
  },
  _handleSubmit: function (e) {
    e.preventDefault()
    var newPassword = this.state.newPassword
    var confirmPassword = this.state.confirmPassword
    if (!newPassword) {
      this.showMessage("新密码不能为空！")
      return
    }
    if (newPassword != confirmPassword) {
      this.showMessage("前后密码不一样！")
      return
    }
    var data = {tel: this.props.location.state.phone, code: this.props.location.state.code, password: newPassword}
    console.log(data)
    UserActions.receiveTelResetPassWord(data)
  },
  showMessage(content) {
    this.refs.toast.show(content)
  },
  render() {
    return (
      <DocumentTitle title="重置密码第二步">
        <div>
          <Toaster ref="toast" />
          <form className="find-password">
            <InputGroup
              iconLeft="mima01"
              updateValue={ newPassword => this.setState({newPassword}) }
              type="password"
              placeholder="请输入密码"
            />

            <InputGroup
              iconLeft="mima01"
              updateValue={ confirmPassword => this.setState({confirmPassword}) }
              type="password"
              placeholder="请再次输入密码"
            />

            <ButtonBlock
              buttonType="btn-dark"
              value="确认修改"
              handleSubmit={this._handleSubmit}
            />
          </form>
        </div>
      </DocumentTitle>
    )
  }
})

export {ChangePassWordForm as default}
