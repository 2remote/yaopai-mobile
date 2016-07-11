import React from 'react';
import $ from 'jquery';

const WorkDetail = ({data, price}) => {
  console.log(data)
  const getPlace = () => {
    let item = data.PlaceType;
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

  const showDetail = () => {
    $('#workDetailMask').show().addClass('animated bounceIn');
    // 动画执行完毕后要把 'animated bounceIn' 这两个类给去掉，不然偶尔会导致样式错乱
    setTimeout(() => $('#workDetailMask').removeClass('animated bounceIn'), 400);
  }

  const hideDetail = () => {
    $('#workDetailMask').hide();
  }

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
      <button onClick={() => showDetail()}>查看套餐详情 <i className="icon youjiantou" /></button>

      <div className="workDetail-mask" id="workDetailMask">
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
              <span className="b">{getPlace()}</span>
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
              <span className="b">￥{price}</span>
            </li>
            <li style={{height:'auto',paddingBottom:'50px'}}>
              <i className="icon success_icon"></i>
              <span className="a">补充服务说明</span>
              <div style={{lineHeight:'30px',color:'#888'}}>
                {data.Service === '' ? '暂无说明' : data.Service}
              </div>
            </li>
          </ul>
          <button className="btn" onClick={() => hideDetail()}>关闭</button>
        </div>
      </div>
    </div>
  );
}

export {WorkDetail as default};
