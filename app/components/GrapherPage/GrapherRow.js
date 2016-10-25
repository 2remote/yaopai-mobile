import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router'
import {imgModifier} from '../Tools'

import PhotographerAlbumPoolAction from '../../actions/PhotographerAlbumPoolAction'
import PhotographerAlbumPoolStore from '../../stores/PhotographerAlbumPoolStore'

class GrapherRow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      photographerAlbumPool : {},
    }
  }

  photographerAlbumPool(photographerAlbumPool) {
    // 从接口 Albums.Search （查询作品列表）拿到数据
    this.setState({ photographerAlbumPool })
  }

  componentWillMount() {

    if(!this.state.photographerAlbumPool[this.props.data.Id] && !this.state.already) {
      this.setState({
        already: true,
      })
      PhotographerAlbumPoolAction.update(this.props.data.Id)
    }
  }
  render() {
    const grapherAvatar = imgModifier(this.props.data.Avatar, "grapherAvatar")
    let pool = this.state.photographerAlbumPool
    let currentId = this.props.data.Id
    let covers = this.state.photographerAlbumPool[currentId] || []

    return (
      <div className="grapherRow">
        <Link to={"/grapherDetail/"+this.props.data.Id} >
          <div className="info">
            <div className="avatar" style={{backgroundImage:`url(${grapherAvatar})`}} />
            <div className="grapher">
              <p>
                <span className="title">{this.props.data.NickName?this.props.data.NickName:'还没想好名字'}</span>
                <span className="dest"><i className="icon didian"></i>{this.props.data.CityName}</span>
              </p>
              <p className="sign">{this.props.data.Signature}</p>
            </div>
          </div>
          <div className="detail">
            <ul>
              <li>
                <i className="icon grid"></i>{this.props.data.TotalAlbums}套作品
              </li>
              <li>
                <i className="icon xiazai11" style={{fontSize:'14px'}}></i> {this.props.data.Marks}个关注
              </li>
            </ul>
          </div>
          <div className="pics">
            <ul>
              <li className="cover" style={{backgroundImage:`url(${covers[0]?covers[0].Cover:'http://o7b5y93g1.bkt.clouddn.com/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[1]?covers[1].Cover:'http://o7b5y93g1.bkt.clouddn.com/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[2]?covers[2].Cover:'http://o7b5y93g1.bkt.clouddn.com/yaopai-bg.png'})`}}></li>
            </ul>
          </div>
        </Link>
      </div>
    )
  }
}

ReactMixin.onClass(GrapherRow, Reflux.listenTo(PhotographerAlbumPoolStore, 'photographerAlbumPool'))

export {GrapherRow as default}
