import React from 'react';
import $ from 'jquery';

const TagRow = ({data, args, i}) => {

  const tagRowClass = 'tagRowBox' + i
  const tagColClass = 'tagColBox' + i

  const { onSelectedTag, selectedTags } = args

  const handleClick = (tagId, onSelectedTag, tagColClass) => {
    if ( $('#' + tagId).hasClass('tagColBoxActive') ) {
      $('#' + tagId).removeClass('tagColBoxActive')
    } else {
      $('.' + tagColClass).removeClass('tagColBoxActive')
      $('#' + tagId).addClass('tagColBoxActive')
    }
    onSelectedTag()
  }

  let tagNodes;
  if (data != 'undefined'){
    tagNodes = data.map((tag, i) => {
      if(tag.Display){
        // 第一次载入的时候，判断 tag 是否应该处于激活状态
        const intSelectedTags = selectedTags.map((x) => parseInt(x))
        const isTagSelected = intSelectedTags.indexOf(tag.Id)
        const isTagShoudActive = isTagSelected < 0 ? "" : " tagColBoxActive"
        return (
          <div
            key={i}
            className={"tagColBox " + tagColClass + isTagShoudActive}
            id={tag.Id}
            onClick={() => handleClick(tag.Id, onSelectedTag, tagColClass)}
            >
            {tag.Name}
          </div>
        );
      }
    });
  }

  return <div className={ "tagRowBox " + tagRowClass}>{tagNodes}</div>
}

export default TagRow;
