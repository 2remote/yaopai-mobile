var React = require('react');
var Router = require('react-router');
var History = Router.History;
var Location = Router.Location;
var Reflux = require('reflux');
var DocumentTitle = require('react-document-title');
var HamburgMenu = require('../HamburgMenu');
const $ = require('jquery');
var localStorage = require('web-storage')().localStorage;

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');
var AlbumsStore = require('../../stores/AlbumsStore');
var AlbumsActions = require('../../actions/AlbumsActions');
var PhotographerActions = require('../../actions/PhotographerActions');
var PhotographerStore = require('../../stores/PhotographerStore');

import BookIntro from './WorkBookIntro';
import BookForm from './WorkBookForm';

import { BOOK_A_WORK, GET_WORK_INTRO } from '../Tools';

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
  },
});

module.exports = BookPage;
