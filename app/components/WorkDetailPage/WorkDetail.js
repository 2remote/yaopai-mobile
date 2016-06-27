import React from 'react';

class WorkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel : false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  getPlace(){
    let item = this.props.data.PlaceType;
    if(typeof(item)=="undefined"){
      item='';
    }
    let arr = item.split(',');
    let en_arr ='';
    for(let i=0; i<arr.length; i++){
      switch(arr[i].trim()){
      case 'Null':
        en_arr+='无';
        break;
      case 'Studio':
        en_arr+=' 影棚 ';
        break;
      case 'Exterior':
        en_arr+=' 外景 ';
        break;
      case 'Interior':
        en_arr+=' 室内 ';
        break;
      default:
        en_arr+='无';
        break;
      }
    }
    return en_arr;
  }

  handleClick() {
    this.setState({showPanel: !this.state.showPanel});
  }

  render() {
    let style = {
      display: this.state.showPanel ? 'block' : 'none' ,
    }
    const {data} = this.props

    return (
      <div className="workDetail">
        <ul className="package">
          <li>
            <i className="icon yifu"/>
            <span>服装造型</span>
          </li>
          <li>
            <i className="icon meizhuang" style={{fontSize:'25px'}}/>
            <span>提供化妆</span>
          </li>
          <li>
            <i className="icon jingxuan" style={{fontSize:'32px'}}/>
            <span>照片精修</span>
          </li>
          <li>
            <i className="icon shijian"/>
            <span>拍摄时长</span>
          </li>
        </ul>
        <button onClick={this.handleClick}>查看套餐详情</button>

        <div className="workDetail-mask" style={style}>
          <div className="panel">
            <p className="a">套餐详情</p>
            <ul>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">照片类型</span>
                <span className="b">数码/胶片</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">拍摄人数</span>
                <span className="b">{data.PeopleCount}人</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">原片提供</span>
                <span className="b">{data.OriginalSupport?'全送':'不送'}</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">底片张数</span>
                <span className="b">{data.PlateCount}张</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">精修张数</span>
                <span className="b">{data.TruingCount}张</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">拍摄时长</span>
                <span className="b">{data.Duration}</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">拍摄组数</span>
                <span className="b">{data.UnitCount}组</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">服装提供</span>
                <span className="b">{data.CostumeCount}套</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">化妆造型</span>
                <span className="b">{data.MakeUpSupport?'提供':'不提供'}</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">场景数量</span>
                <span className="b">{data.SceneCount}处</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">拍摄场地</span>
                <span className="b">{this.getPlace()}</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">拍摄机位</span>
                <span className="b">{data.SeatCount}个</span>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">交付天数</span>
                <span className="b">与摄影师协商</span>
              </li>
              <li style={{overflow:'auto',height:'auto'}}>
                <i className="icon success_icon"></i>
                <span className="a">实体产品</span>
                <span className="b">{data.PhysicalSupport?'提供':'不提供'}</span>
                <div style={{lineHeight:'30px',color:'#888'}}>
                  {data.PhysicalDetail===null?'':data.PhysicalDetail}
                </div>
              </li>
              <li>
                <i className="icon success_icon"></i>
                <span className="a">套系价格</span>
                <span className="b">￥{this.props.data.Price}</span>
              </li>
              <li style={{height:'auto',paddingBottom:'50px'}}>
                <i className="icon success_icon"></i>
                <span className="a">补充服务说明</span>
                <div style={{lineHeight:'30px',color:'#888'}}>
                  {this.props.data.Service===''?'暂无说明':this.props.data.Service}
                </div>
              </li>
            </ul>
            <button className="btn" onClick={this.handleClick}>关闭</button>
          </div>
        </div>
      </div>
    );
  }
};

export {WorkDetail as default};
