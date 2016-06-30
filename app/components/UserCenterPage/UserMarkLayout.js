import React from 'react'
import { Link } from 'react-router'

const UserMarkLayout = () => (
  <nav className="mark-nav">
    <div className="link-box">
      <Link to="/center/mark/user_collect" activeClassName="active">作品收藏</Link>
    </div>
    <div className="link-box">
      <Link to="/center/mark/user_attention" activeClassName="active">摄影师关注</Link>
    </div>
  </nav>
)

export default UserMarkLayout
