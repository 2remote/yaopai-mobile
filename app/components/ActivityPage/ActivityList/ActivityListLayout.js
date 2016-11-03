import React from 'react'

import { Link } from 'react-router'

class ActivityListLayout extends React.Component{
  render() {
    const date = new Date()
    const {source} = this.props
    return (
      <div>
        <ul>
          {
            source.length ? (
              source.map((item, i) => 
              <Link key={i} to={"/discover/activity/activityDetail/"+item.Id}>
                <li className="ac-bg" style={{backgroundImage: `url(${item.Cover})`,backgroundSize:'cover'}}>
                  <div className="ac-mask">
                    {
                      Date.parse(new Date(item.EndDate))>Date.parse(new Date()) ? 
                      <span className="ac-status ">报名中</span> : 
                      <span className="ac-status-close">已结束</span>
                    }
                    <h1 className="ac-title">{ item.Title }</h1>
                    <span className="ac-des ac-prov">{ item.ProvinceName }</span>
                  </div>
                </li>
              </Link>
              )
            ) : '暂无数据'
          }
        </ul>
      </div>
    )
  }
}

export default ActivityListLayout