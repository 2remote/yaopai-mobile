import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

class WorkTitle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      isClickMark: false,
      markExist: false,
    }
    this.attention = this.attention.bind(this)
    this.unAttention = this.unAttention.bind(this)
  }

  componentWillMount() {
    UserActions.currentUser()
  }
  // 获取登录信息
  onUserLoad(userData) {
    this.setState({ userData })
  }

  // 点击关注
  attention() {
    if(!this.state.userData.isLogin){ // 用户未登录
      const confirmMsg = confirm("是否前往登录，然后关注？");
      if (confirmMsg == true) {
        this.history.pushState({nextPage : this.props.pathname},'/login_page');
      } else {

      }

    } else {
      this.setState({isClickMark: true})
      // TODO 如何防止用户多次提交
      AlbumsActions.mark(this.props.id)
    }
  }
  // 点击取消关注
  unAttention() {
    this.setState({isClickMark: true})
    // TODO 如何防止用户多次提交
    // confirm('确定取消关注吗')
    AlbumsActions.unMark(this.props.id)
  }

  onMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }

  onUnMarkSuccess(data){
    if (data.markExist.id == this.props.id) {
      this.setState({
        markExist: data.markExist.isMark,
      })
    }
  }
  render(){
    const {data} = this.props
    return (
      <section className="workTitlePanel">
        <div className="work-collect">
          {
            (this.state.isClickMark ? this.state.markExist : data.markExist)
            ?
            <i className="icon mark_active"
               onClick={this.unAttention}
            />
            :
            <i className="icon mark"
               onClick={this.attention}
            />
          }
        </div>
        <div className="cover" style={{backgroundImage:`url(${data.cover})`,backgroundSize:'cover'}}/>
        <p className="title-a">
          <span className="title">{data.title}</span>
          <span className="price">￥{data.price}</span>
        </p>
        <p className="sub-title">{ data.description}</p>
      </section>
    )
  }
}

ReactMixin.onClass(WorkTitle,Reflux.listenTo(AlbumsStore, 'onMarkSuccess'));
ReactMixin.onClass(WorkTitle,Reflux.listenTo(AlbumsStore, 'onUnMarkSuccess'));
ReactMixin.onClass(WorkTitle, Reflux.listenTo(UserStore, 'onUserLoad'));
ReactMixin.onClass(WorkTitle, History);
export {WorkTitle as default};
