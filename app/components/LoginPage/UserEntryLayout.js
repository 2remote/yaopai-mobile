import React from 'react'
import { Link } from 'react-router'

const windowHeight = document.body.scrollHeight;
let entryCoverHeight = windowHeight;
if (windowHeight >= 736) { // iPhone 6 Plus
  entryCoverHeight = 0.56 * windowHeight;
} else if (windowHeight >= 667 && windowHeight < 736) { // iPhone 6
  entryCoverHeight = 0.52 * windowHeight;
} else if (windowHeight >= 568 && windowHeight < 667) { // iPhone 5 || SE
  entryCoverHeight = 0.45 * windowHeight;
}

const UserEntryLayout = () => (
  <section className="entry-container" style={{height: entryCoverHeight + 'px'}}>
    <header className="entry-header">
      <i className="icon yaopainew"></i><br/>
      <p>全球&nbsp;预约&nbsp;摄影师&nbsp;平台</p>
    </header>
    <nav className="entry-nav">
      <Link to="/login_page" activeClassName="active">登录 | Login</Link>
      <Link to="/signupPage" activeClassName="active">注册 | SignUp</Link>
    </nav>
  </section>
)

export default UserEntryLayout
