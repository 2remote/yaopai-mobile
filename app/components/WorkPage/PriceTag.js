import React from 'react'
import $ from 'jquery'

const PriceTag = () => {

  const tagRowClass = 'tagRowBoxP'
  const tagColClass = 'tagColBoxP'

  const handleClick = (tagId, tagColClass) => {
    if ( $('#' + tagId).hasClass('tagColBoxActive') ) {
      $('#' + tagId).removeClass('tagColBoxActive')
    } else {
      $('.' + tagColClass).removeClass('tagColBoxActive')
      $('#' + tagId).addClass('tagColBoxActive')
    }
  }

  return (
    <div>

      <span className="tag-title">
        价格
        <i className="icon down tag-titile-button" />
      </span>

      <div className="tagRowBox showTagRowBox tagRowBoxP">

        <div
          id = "P1"
          className = "tagColBox tagColBoxP"
          onClick = {() => handleClick("P1", tagColClass)}
          >
          0-99
        </div>
        <div
          id = "P2"
          className = "tagColBox tagColBoxP"
          onClick = {() => handleClick("P2", tagColClass)}
          >
          100-499
        </div>
      </div>

    </div>
  )
}

export default PriceTag
