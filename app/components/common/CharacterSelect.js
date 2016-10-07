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
    let nodeList = []
    const {data} = this.props
    for(let i = 0; i < data.length; i += 4) {
      let node = data.slice(i, i + 4).map((tag, index) =>
        <a key={index} href="javascript:void(0)" style={{background: `url(${tag.Cover}) center cnnter no-repeat`, backgroundSize: 'cover'}}>{tag.Name}</a>
      )
      nodeList.push(node)
    }
    return (
      <div id="mySwipe" className="swipe">
        <div className="swipe-wrap">
          {
            nodeList.map((node, index) => <div key={index} className="swipe-item">{node}</div>)
          }
        </div>
      </div>
    )
  }
}

export default CharacterSelect
