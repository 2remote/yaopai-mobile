import React from 'react'
import Swipe from '../Swipe'
import $ from 'jquery'

class CharacterSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {data} = nextProps
    for(let i = 0; i < data.length; i += 4) {
      let nodeList = ''
      data.slice(i, i + 4).forEach((tag, index) => {
        nodeList += `<a href="javascript:void(0)" style="background: url(${tag.Cover}) center cnnter no-repeat; background-size: cover">${tag.Name}</a>`
      })
      $('#swipe-wrap').append(`<div class="swipe-item">${nodeList}</div>`)
    }

    const mySwipe = Swipe(document.getElementById('mySwipe'), {
      // startSlide: 4,
      auto: 3000,
      // continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      // transitionEnd: function(index, element) {}
    })
    return true
  }

  render() {

    return (
      <div id="mySwipe" className="swipe">
        <div className="swipe-wrap" id="swipe-wrap"></div>
      </div>
    )
  }
}

export default CharacterSelect
