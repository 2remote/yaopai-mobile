import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
var History = Router.History;
var Location = Router.Location;
import DocumentTitle from 'react-document-title';
import HamburgMenu from '../HamburgMenu';
import $ from 'jquery';
var localStorage = require('web-storage')().localStorage;

import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import OrderActions from '../../actions/OrderActions';
import OrderStore from '../../stores/OrderStore';
import AlbumsStore from '../../stores/AlbumsStore';
import AlbumsActions from '../../actions/AlbumsActions';
import PhotographerActions from '../../actions/PhotographerActions';
import PhotographerStore from '../../stores/PhotographerStore';

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
  }
});

export {BookPage as default};