import React from 'react';
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import DocumentTitle from 'react-document-title';

import WorkTitle from './WorkTitle';
import WorkPieceList from './WorkPieceList';
import ActionBar from './ActionBar';
import WorkDetail from './WorkDetail';
import AboutGrapher from './AboutGrapher';
import AboutYAOPAILayout from './AboutYAOPAILayout';
import SidePage from '../UI/SidePage';

import AlbumsStore from '../../stores/AlbumsStore';
import AlbumsActions from '../../actions/AlbumsActions';
import { GET_WORK_DETAIL, TITLE } from '../Tools';
import {History} from 'react-router';
import WechatShare from '../Weixin/WechatShare';

class WorkDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photographer: [],
      detail: {},
      photos: {},
      workData: {
        title: '',
        price: '',
        cover: '',
        service: '',
        description: '',
        id: '',
        workId: '',
        MarkExist: false,
      },
      shareFrom: this.props.location.query.sharefrom,
    }
  }

  showTop(){
    window.scrollTo(0,0);
  }

  componentDidMount() {
    if(!this.props.params.Id) return this.history.pushState(null,'/work');
    AlbumsActions.get(this.props.params.Id);
  }

  _onAlbumsStoreChange(data){
    if(data.flag == 'get'){
      if(data.hintMessage == '数据未找到'){
        console.log(data.hintMessage);
        alert('该摄影师已被禁用！')
        this.history.replaceState(null, '/work');
        return;
      }else{
        this.setState({
          photographer : data.workData.Photographer,
          detail : data.workData.Detail,
          photos : data.workData.Photos,
          workData: {
            title: data.workData.Title,
            price: data.workData.Price,
            cover: data.workData.Cover,
            service: data.workData.Service,
            description: data.workData.Description,
            id: data.workData.Photographer.Id,
            workId: data.workData.Id,
            markExist: data.workData.MarkExist,
          }
        });
      }
    }
  }

  renderPrice(){
    const negotiable = this.state.data.Negotiable;
    const price = this.state.data.Price;
    let priceResult = "面议";

    if(!negotiable){
      priceResult = price;
    }
    return (
    <span
      style={{color:'#050505',fontWeight:'bold'}}
      ref="workPrice"
      className="workPrice">{priceResult}
    </span>
    )
  }

  render() {
    return (
      <div className="workDetailPage" onload={this.showTop()}>
        <DocumentTitle title={this.state.workData.title + TITLE.workDetailPage} />
        <SidePage shareFrom={this.state.shareFrom}/>
        <WorkTitle data={this.state.workData} />
        <WorkDetail data={this.state.detail} workData={this.state.workData} />
        <AboutGrapher data={this.state.photographer} id={this.state.workData.id} />
        <WorkPieceList workPieces={this.state.photos} />
        <ActionBar id={this.state.workData.workId} price={this.state.workData.price} />
        <AboutYAOPAILayout />
        <WechatShare title={this.state.workData.title} desc={this.state.workData.description} imgUrl={this.state.workData.cover} />
      </div>
    );
  }
}

ReactMixin.onClass(WorkDetailPage, Reflux.listenTo(AlbumsStore, '_onAlbumsStoreChange'));
ReactMixin.onClass(WorkDetailPage, History);

export {WorkDetailPage as default};
