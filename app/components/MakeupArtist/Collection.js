import React from 'react'
import $ from 'jquery'

class Collection extends React.Component {
  componentDidMount() {
    // 让 jquery 支持 toggle 方法
    $(function() {
      $.fn.toggle = function(fn, fn2) {
        let args = arguments
        let guid = fn.guid || $.guid++
        let i = 0
        let toggle = function(event) {
          let lastToggle = ($._data(this, "lastToggle" + fn.guid) || 0) % i
          $._data(this, "lastToggle" + fn.guid, lastToggle + 1)
          event.preventDefault()
          return args[lastToggle].apply(this, arguments) || false
        }
        toggle.guid = guid;
        while (i < args.length) {
          args[i++].guid = guid;
        }
        return this.click(toggle);
      }


    })
  }

  render() {
    console.log(this.props)
    return <i className={`icon ${this.props.isMark ? 'mark_active' : 'mark'}`} />
  }
}

export default Collection
