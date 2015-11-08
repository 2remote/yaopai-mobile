var React = require('react');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');

import BookIntro from '../BookPage/GrapherBookIntro';
import BookForm from '../BookPage/GrapherBookForm';

var BookPage = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="填写预约信息">
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
          <BookForm />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = BookPage;
