'use strict';
var React = require('react');
import { Router, Route, IndexRoute } from 'react-router';

var App = require('./components/Index');

var WorkPage = require('./components/WorkPage');
var WorkDetailPage = require('./components/WorkDetailPage');
var GrapherPage = require('./components/GrapherPage');
var GrapherDetailPage = require('./components/GrapherDetailPage');

var InterviewPage = require('./components/InterviewPage');
var InterviewDetailPage = require('./components/InterviewDetailPage');

var ActivityPage = require('./components/ActivityPage');
var ActivityDetailPage = require('./components/ActivityDetailPage');

var LoginPage = require('./components/LoginPage');
var SignupPage = require('./components/SignupPage');
var FindMyPassPage1 = require('./components/FindMyPassPage/FindByMobileForm');
var FindMyPassPage2 = require('./components/FindMyPassPage/ChangePassWordForm');
var WorkBookPage = require('./components/BookPage');
var ReactDOM = require('react-dom');

import BookSuccessDialog from './components/BookPage/BookSuccessDialog';
import BookModify from './components/BookPage/BookModify';
import UserCenterPage from './components/UserCenterPage';
import UserTicketsPage from './components/UserCenterPage/UserTicketsPage';
import UserEditProfile from './components/UserCenterPage/UserEditProfilePage';
import UserNickNameChange from './components/UserCenterPage/UserNickNameChangePage';
import UserGenderChange from './components/UserCenterPage/UserGenderChangePage';
import UserCityChange from './components/UserCenterPage/UserCityChangePage';

import GrapherCenterPage from './components/UserCenterPage/GrapherCenterPage';
import GrapherTicketsPage from './components/UserCenterPage/GrapherTicketsPage';
import GrapherBookSuccessDialog from './components/BookPage/GrapherBookSuccessDialog';
import ConfirmBookDialog from './components/UserCenterPage/ConfirmBookDialog';
import SidePage from './components/SidePage';
import ViewOrder from './components/UserCenterPage/ViewOrder';

main();

function main(){
  ReactDOM.render((
    <Router>
      <Route path="/" component={App} />
      <Route path="/work(/:tag)(/:tag)(/:tag)(/:tag)" component={WorkPage} />
      <Route path="/workDetail/:Id" component={WorkDetailPage} />

      <Route path="/interview" component={InterviewPage} />      
      <Route path="/interviewDetail/:Id" component={InterviewDetailPage} />

      <Route path="/activity" component={ActivityPage} />
      <Route path="/activityDetail/:Id" component={ActivityDetailPage} />

      <Route path="/grapher" component={GrapherPage} />
      <Route path="/grapherDetail/:Id" component={GrapherDetailPage} />
      <Route path="/login_page" component={LoginPage} />
      <Route path="/signupPage" component={SignupPage} />
      <Route path="/find_my_pass_page1" component={FindMyPassPage1} />
      <Route path="/find_my_pass_page2" component={FindMyPassPage2} />
      <Route path="/work_book_page/:workId/:photographerId" component={WorkBookPage} />
      <Route path="/book_success_dialog/:orderId" component={BookSuccessDialog} />
    
      <Route path="/grapher_book_success_dialog" component={GrapherBookSuccessDialog} />
      
      <Route path="/user_center" component={UserCenterPage} />
      <Route path="/user_tickets" component={UserTicketsPage} />
      <Route path="/user_edit_profile" component={UserEditProfile} />
      <Route path="/user_nickname_change" component={UserNickNameChange} />
      <Route path="/user_gender_change" component={UserGenderChange} />
      <Route path="/user_city_change" component={UserCityChange} />

      <Route path="/grapher_center" component={GrapherCenterPage} />
      <Route path="/grapher_tickets" component={GrapherTicketsPage} />

      <Route path="/viewOrder/:type/:orderId" component={ViewOrder} />
      <Route path="/confirm_book_dialog" component={ConfirmBookDialog} />
      <Route path="/book_modify/:workId/:photographerId" component={BookModify} />
    </Router>
    ), document.getElementById('app')
  );
}
