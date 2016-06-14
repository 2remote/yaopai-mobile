import React from 'react';
import DocumentTitle from 'react-document-title';
import HamburgMenu from '../HamburgMenu';

import BookIntro from './WorkBookIntro';
import BookForm from './WorkBookForm';


var BookPage = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="作品预约">
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            minHeight: '100%',
            backgroundImage:'url(imgs/bookPageBg.png)'
          }}
          className="bookPage">
          <HamburgMenu />
          <BookIntro />
          <BookForm subValue="修改预约" />
        </div>
      </DocumentTitle>
    );
  }
});

export {BookPage as default};