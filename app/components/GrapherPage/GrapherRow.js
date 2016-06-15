import React from 'react';
<<<<<<< HEAD
import { Router, Route, Link } from 'react-router';

=======
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';
>>>>>>> dev
import {imgModifier} from '../Tools';

<<<<<<< HEAD
var deviceWidth = parseInt(window.innerWidth);

var GrapherRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
       
      }
    };
  },
  
  render: function() {
    var grapherPageIntro = {
      height: deviceWidth/2
    };
    var nickStyle = {
      marginTop: -4*deviceWidth/375,
      marginBottom: 5*deviceWidth/375
    };
    var grapherSpliterLineStyle ={
      top: -5*deviceWidth/375
    };

    const rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.User.Id) % 47 + 1 ) + '.png';
    const grapherAvatar = imgModifier(this.props.data.User.Avatar||rondomAvatar, "grapherAvatar");


    return (
      <div className="grapherRow">
        <div className="grapherAvatar">
        <Link to={"/grapherDetail/"+this.props.data.Id} >
          <div style={{width : '100%' ,height : deviceWidth/2 ,backgroundColor : '#eeedeb'}}>
            <LazyLoad threshold={100} once>
              <img
                ref="avatar"
                src={grapherAvatar} />
            </LazyLoad>
          </div>
        </Link>
        </div>
        <div className="grapherPageIntro" style={grapherPageIntro}>
          <div className="grapherIntroContainer">
            <div 
              ref="name">{this.props.data.User.NickName}</div>
            <div 
              style={nickStyle}
              ref="nick">{this.props.data.nick}</div>
            <span
              className="icon location_icon"  
              style={{marginRight:6, fontSize:22}}
              ref="locationIcon" />
            <span
              ref="location">{this.props.data.CityName}</span>     
            <img 
              ref="grapherSpliterLine"
              style={grapherSpliterLineStyle}
              src="imgs/grapherPage/grapher-spliter-line.png"
              srcSet="imgs/grapherPage/grapher-spliter-line@2X.png 2x" />     
            <Link to={"/work_book_page/0/"+this.props.data.Id} >  
              <button ref="grapherBook">预约</button>
            </Link> 
          </div>
        </div>
=======
import PhotographerAlbumPoolAction from '../../actions/PhotographerAlbumPoolAction';
import PhotographerAlbumPoolStore from '../../stores/PhotographerAlbumPoolStore';

class GrapherRow extends React.Component {
  constructor(props){
    super(props);
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
      });
      PhotographerAlbumPoolAction.update(this.props.data.Id);
    }
  }
  render() {
    const rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.User.Id) % 47 + 1 ) + '.png';
    const grapherAvatar = imgModifier(this.props.data.Avatar||rondomAvatar, "grapherAvatar");
    let pool = this.state.photographerAlbumPool;
    let currentId = this.props.data.Id;
    let covers = this.state.photographerAlbumPool[currentId] || [];

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
                <i className="icon dingdan" style={{fontSize:'13px'}}></i> {this.props.data.Sales}个订单
              </li>
              <li>
                <i className="icon xiazai11" style={{fontSize:'14px'}}></i> {this.props.data.Marks}个关注
              </li>
            </ul>
          </div>
          <div className="pics">
            <ul>
              <li className="cover" style={{backgroundImage:`url(${covers[0]?covers[0].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[1]?covers[1].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
              <li className="cover" style={{backgroundImage:`url(${covers[2]?covers[2].Cover:'/app/imgs/grapherPage/yaopai-bg.png'})`}}></li>
            </ul>
          </div>
        </Link>
>>>>>>> dev
      </div>
    );
  }
};

ReactMixin.onClass(GrapherRow, Reflux.listenTo(PhotographerAlbumPoolStore, 'photographerAlbumPool'));

export {GrapherRow as default};
