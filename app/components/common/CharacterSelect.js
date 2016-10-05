import React from 'react'
import Swipe from '../Swipe'

class CharacterSelect extends React.Component {
  componentDidMount() {
    const mySwipe = Swipe(document.getElementById('mySwipe'), {
      // startSlide: 4,
      auto: 3000,
      // continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      // transitionEnd: function(index, element) {}
    })
  }

  render() {
    return (
      <div id="mySwipe" className="swipe">
        <div className="swipe-wrap">
          <div className="swipe-item">
            <a style={{background: 'red'}} href="javascript:void(0)">平面模特</a>
            <a style={{background: 'yellow'}} href="javascript:void(0)">甜美私房</a>
            <a style={{background: '#f60'}} href="javascript:void(0)">COS 专区</a>
            <a style={{background: 'green'}} href="javascript:void(0)">淘宝商拍</a>
          </div>
          <div className="swipe-item">
            <a style={{background: 'blue'}} href="javascript:void(0)">小清新</a>
            <a style={{background: 'gold'}} href="javascript:void(0)">美丽大方</a>
            <a style={{background: '#f60'}} href="javascript:void(0)">秀色可餐</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSelect
