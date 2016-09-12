import React from 'react'
import $ from 'jquery'
import _ from 'underscore'

const MyChoices = ({args}) => {

  const {onSelectedTag, tags = [], selectedTags = [], priceTag, onPriceTag} = args

  const removePriceChoice = () => {
    onPriceTag()
    $('.tagColBoxP.tagColBoxActive').removeClass('tagColBoxActive')
  }

  const handleClick = (tagId, onSelectedTag) => {
    $('#' + tagId).removeClass('tagColBoxActive')
    onSelectedTag()
  }

  const resetTags = () => {
    // 清空标签，以及重置 state
    $('.tagColBoxActive').removeClass('tagColBoxActive')
    onSelectedTag()
    onPriceTag()
  }

  let priceChoice
  const priceList = ['0 - 99', '100 - 499', '500 - 1999', '2000 - 4999', '5000 以上']
  if (priceList[priceTag]) {
    priceChoice = (
      <span
        key={priceList[priceTag]}
        className="my-choice"
        onClick={removePriceChoice} >
        {priceList[priceTag]}
        <span className="close">X</span>
      </span>
    )
  }

  let myChoices
  const intSelectedTags = selectedTags.map((x) => parseInt(x))
  if (tags != 'undefined') {
    myChoices = tags.map((data) => {
      return (
        data.Tags.map((tag, i) => {
          if (_.contains(intSelectedTags, tag.Id)) {
            return (
              <span
                key={i}
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
        {priceChoice}
        {myChoices}
      </div>
    </div>
  )

}

export default MyChoices
