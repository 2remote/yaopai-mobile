import React from 'react'
import $ from 'jquery'

import browser from '../../Browser'

class ActivityDetailLayout extends React.Component{
  constructor(props){
    super(props)
  }

  showJoinPage() {
    this.props.showPage()
  }

  render() {
    $("#ac-content").html(this.props.source.Content)
    // 判断是否是webApp
    if(!browser.versions.webApp){
      $("#ac-content a").attr("onclick",(n,v) => {
        return v+";return false;"
      })
    }

    return (
      <div className="ac-container">
        <div id="ac-content"></div>
        {
          this.props.isShowButton ? <a className="ac-enroll" onClick={ this.showJoinPage.bind(this) }>立刻报名</a> : null
        }
      </div>
    )
  }
}

export default ActivityDetailLayout
