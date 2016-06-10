import React from 'react';
import $ from 'jquery';

const TagRow = ({data, onSelectedTag}) => {
  const handleClick = (tagId, onSelectedTag) => {
    $("#tagColBox").toggleClass('tagColBoxActive');
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
            id="tagColBox"
            onClick={() => handleClick(tag.id, onSelectedTag)}
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
