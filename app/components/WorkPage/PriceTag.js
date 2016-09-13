import React from 'react'
import $ from 'jquery'

const PriceTag = ({priceTag, onPriceTag}) => {

  const tagRowClass = 'tagRowBoxP'
  const tagColClass = 'tagColBoxP'

  const togglePriceTag = () => {
    $(".tagRowBoxP").toggleClass('showTagRowBox')
  }

  const handleClick = (tagId, tagColClass) => {
    if ( $('#P' + tagId).hasClass('tagColBoxActive') ) {
      $('#P' + tagId).removeClass('tagColBoxActive')
      onPriceTag()
    } else {
      $('.' + tagColClass).removeClass('tagColBoxActive')
      $('#P' + tagId).addClass('tagColBoxActive')
      onPriceTag(tagId)
    }
  }

  const priceList = ['0 - 99', '100 - 499', '500 - 1999', '2000 - 4999', '5000 以上']

  let priceDiv = priceList.map((data, i) => {
    return (
      <div
        id = { 'P' + i }
        key = {i}
        className = "tagColBox tagColBoxP"
        onClick = {() => handleClick(i, tagColClass)}
        >
        {data}
      </div>
    )
  })


  return (
    <div>

      <span className="tag-title" onClick={togglePriceTag}>
        价格
        <i className="icon down tag-titile-button" />
      </span>

      <div className="tagRowBox showTagRowBox tagRowBoxP">
        {priceDiv}
      </div>

    </div>
  )
}

export default PriceTag
