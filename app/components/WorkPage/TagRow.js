import React from 'react';
import $ from 'jquery';

const TagRow = ({data, onSelectedTag, tagRowClass}) => {
  const handleClick = (tagId, onSelectedTag, tagRowClass) => {
    if ( $('#' + tagId).hasClass('tagColBoxActive') ) {
      $('#' + tagId).removeClass('tagColBoxActive')
      onSelectedTag(tagId, tagRowClass)
    } else {
      $('.' + tagRowClass).removeClass('tagColBoxActive')
      $('#' + tagId).addClass('tagColBoxActive')
      onSelectedTag(tagId, tagRowClass)
    }

  }

  let tagNodes;
  if (data != 'undefined'){
    tagNodes = data.map((tag, i) => {
      if(tag.Display){
        return (
          <div
            key={i}
            className={"tagColBox " + tagRowClass}
            id={tag.Id}
            onClick={() => handleClick(tag.Id, onSelectedTag, tagRowClass)}
            >
            {tag.Name}
          </div>
        );
      }
    });
  }

  return <div className="tagRowBox">{tagNodes}</div>
}

export default TagRow;
