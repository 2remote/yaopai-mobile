import React from 'react'
import { Link } from 'react-router'

const UserMarkLayout = () => (
  <nav className="mark-nav">
    <Link to="/center/mark/user_collect" activeClassName="active">收藏</Link>
    <Link to="/center/mark/user_attention" activeClassName="active">关注</Link>
  </nav>
)

export default UserMarkLayout
