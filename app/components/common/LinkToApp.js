import React from 'react'
import $ from 'jquery'

// 用 app 打开或者下载 app
const LinkToApp = () => {

  if (!localStorage.getItem('linkToApp')) {
    $(".linkToApp").show()
  }

  const close = () => {
    $(".linkToApp").hide()
    localStorage.setItem('linkToApp', 'hide');
  }

  if (iOS) {
    return (
      <div className="linkToApp">
        <span className="cancel" onClick={close}>
          <i className="icon cancel_circle_icon" />
        </span>
        <a href="http://a.app.qq.com/o/ioslink.jsp?id=1105711466">
          <div className="img">
            <img src="http://a4.mzstatic.com/us/r30/Purple62/v4/9e/89/53/9e8953ed-4f6c-fb40-1581-4880e8d05869/icon175x175.jpeg" />
          </div>
          <div className="description">
            <div>
              YAOPAI 客户端
            </div>
            <div className="des2">
              直接与你喜欢的摄影师沟通
            </div>
          </div>
          <div className="download">立即下载</div>
        </a>
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

export default LinkToApp
