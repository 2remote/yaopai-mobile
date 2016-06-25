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
import {History} from 'react-router'
import './index.scss';
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
        description: '',
        id: '',
      },
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
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        console.log(data)
        this.setState({
          photographer : data.workData.Photographer,
          detail : data.workData.Detail,
          photos : data.workData.Photos,
          workData: {
            title: data.workData.Title,
            price: data.workData.Price,
            cover: data.workData.Cover,
            description: data.workData.Description,
            id: data.workData.Id,
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
      className="workPrice">{priceResult}</span>
    )
  }

  render() {
    return (
      <div className="workDetailPage" onload={this.showTop()}>
<<<<<<< HEAD
        <DocumentTitle title={this.state.data.Title + TITLE.workDetailPage} />
=======
        <DocumentTitle title={this.state.workData.title + TITLE.workDetailPage} />
>>>>>>> dev
        <SidePage />
        <WorkTitle data={this.state.workData} />
        <WorkDetail data={this.state.detail} />
        <AboutGrapher data={this.state.photographer} id={this.state.workData.id} />
        <WorkPieceList workPieces={this.state.photos} />
        <ActionBar id={this.state.workData.id} price={this.state.workData.price} />
        <AboutYAOPAILayout />
        <WechatShare title={this.state.workData.title} desc={this.state.workData.description} imgUrl={this.state.workData.cover} />
      </div>
    );
  }
}

ReactMixin.onClass(WorkDetailPage, Reflux.listenTo(AlbumsStore, '_onAlbumsStoreChange'));
ReactMixin.onClass(WorkDetailPage, History);

export {WorkDetailPage as default};
