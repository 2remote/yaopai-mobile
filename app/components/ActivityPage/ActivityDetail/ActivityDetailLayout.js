import React from 'react'
import $ from 'jquery'

class ActivityDetailLayout extends React.Component{
  constructor(props){
    super(props)
  }

  showJoinPage() {
    this.props.showPage()
  }

  render() {
    $("#ac-content").html(this.props.source.content)
    return (
      <div className="ac-container">
        <div id="ac-content"></div>
        <a className="ac-enroll" onClick={ this.showJoinPage.bind(this) }>立即报名</a>
      </div>
    )
  }
}

export default ActivityDetailLayout