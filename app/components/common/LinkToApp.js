import React from 'react'

// 用 app 打开或者下载 app
const LinkToApp = () => {
  if (iOS) {
    return (
      <li className="pure-menu-item nav-list-bar">
        <a href="http://a.app.qq.com/o/ioslink.jsp?id=1105711466">
          <i className="menu-icon icon app" />
          <div className="menu-button"><span>下载&nbsp;&nbsp;App</span></div>
        </a>
      </li>
    )
  } else {
    return (
      <div />
    )
  }
}

export default LinkToApp
