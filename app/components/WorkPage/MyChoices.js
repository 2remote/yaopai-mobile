import React from 'react'
import $ from 'jquery'
import _ from 'underscore'

const MyChoices = ({args}) => {

  const {onSelectedTag, tags= [], selectedTags = []} = args

  const handleClick = (tagId, onSelectedTag) => {
    $('#' + tagId).removeClass('tagColBoxActive')
    onSelectedTag()
  }

  const resetTags = () => {
    // 清空标签，以及重置 state
    $('.tagColBoxActive').removeClass('tagColBoxActive')
    onSelectedTag()
  }

  let myChoices
  const intSelectedTags = selectedTags.map((x) => parseInt(x))
  if (tags != 'undefined') {
    myChoices = tags.map((data, i) => {
      return (
        data.Tags.map((tag, i) => {
          if (_.contains(intSelectedTags, tag.Id)) {
            return (
              <span
                className="my-choice"
                onClick={() => handleClick(tag.Id, onSelectedTag)} >
                {tag.Name}
                <span className="close">X</span>
              </span>
            )
          }
        })
      )
    })
  }

  // 未选择标签的时候隐藏整个「我的选择」
  if ( $( ".my-choices" ).has( ".my-choice" ).length ) {
    $('.my-choices-label').show()
  } else {
    $('.my-choices-label').hide()
  }

  return (
    <div>
      <div className="title my-choices-label">
        我的选择
        <span className="reset" onClick={resetTags}>清除</span>
      </div>

      <div className="my-choices">
        {myChoices}
      </div>
    </div>
  )

}

export default MyChoices
