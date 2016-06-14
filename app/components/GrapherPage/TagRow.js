import React from 'react';
import $ from 'jquery';

const TagRow = ({data, onSelectedTag}) => {
  const handleClick = (tagId, onSelectedTag) => {
    $('#'+tagId).toggleClass('tagColBoxActive');
    onSelectedTag(tagId);
  }

  let tagNodes;
  if (data != 'undefined'){
    tagNodes = data.map((tag, i) => {
      if(tag.Display){
        return (
          <div
            key={i}
            className="tagColBox"
            id={tag.Id}
            onClick={() => handleClick(tag.Id, onSelectedTag)}
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
