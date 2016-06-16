import React from 'react';
import $ from 'jquery';

const TagRow = ({data, args, tagRowClass}) => {

  const { onSelectedTag, selectedTags } = args

  const handleClick = (tagId, onSelectedTag, tagRowClass) => {
    if ( $('#' + tagId).hasClass('tagColBoxActive') ) {
      $('#' + tagId).removeClass('tagColBoxActive')
    } else {
      $('.' + tagRowClass).removeClass('tagColBoxActive')
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
            className={"tagColBox " + tagRowClass + isTagShoudActive}
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
