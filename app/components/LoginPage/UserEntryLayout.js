import React from 'react'
import { Link } from 'react-router'

const UserEntryLayout = () => (
  <section className="entry-container">
    <header className="entry-header">
      <i className="icon yaopainew"></i>
      <p style={{color:'#000'}}>全球&nbsp;预约&nbsp;摄影师&nbsp;平台</p>
    </header>
    <nav className="entry-nav">
      <Link to="/login_page" activeClassName="active">登录</Link>
      <Link to="/signupPage" activeClassName="active">注册</Link>
    </nav>
  </section>
)

export default UserEntryLayout
