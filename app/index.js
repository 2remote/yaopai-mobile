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
var LoginPage = require('./components/LoginPage');
var SignupPage = require('./components/SignupPage');
var FindMyPassPage1 = require('./components/FindMyPassPage/FindByMobileForm');
var FindMyPassPage2 = require('./components/FindMyPassPage/ChangePassWordForm');
var WorkBookPage = require('./components/BookPage');
var ReactDOM = require('react-dom');
import BookSuccessDialog from './components/BookPage/BookSuccessDialog';
import BookModify from './components/BookPage/BookModify';
import UserCenterPage from './components/UserCenterPage';
import GrapherCenterPage from './components/UserCenterPage/GrapherCenterPage';
import GrapherBookSuccessDialog from './components/BookPage/GrapherBookSuccessDialog';
import ConfirmBookDialog from './components/UserCenterPage/ConfirmBookDialog';
import SidePage from './components/SidePage';
import ViewOrder from './components/UserCenterPage/ViewOrder'

main();

function main(){
  ReactDOM.render((
    <Router>
      <Route path="/" component={App} />
      <Route path="/work" component={WorkPage} />
      <Route path="/interview" component={InterviewPage} />
      <Route path="/workDetail/:Id" component={WorkDetailPage} />
      <Route path="/interviewDetail/:Id" component={InterviewDetailPage} />
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
      <Route path="/viewOrder/:type/:orderId" component={ViewOrder} />
      <Route path="/grapher_center" component={GrapherCenterPage} />
      <Route path="/confirm_book_dialog" component={ConfirmBookDialog} />
      <Route path="/book_modify/:workId/:photographerId" component={BookModify} />
    </Router>
    ), document.getElementById('app')
  );
}
