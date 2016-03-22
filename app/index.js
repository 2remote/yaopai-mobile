'use strict';
import React from 'react';

import './index.scss';

import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

import AppIndex from './components/Index';

import WorkPage from './components/WorkPage';
import WorkDetailPage from './components/WorkDetailPage';
import GrapherPage from './components/GrapherPage';
import GrapherDetailPage from './components/GrapherDetailPage';

import InterviewPage from './components/InterviewPage';
import InterviewDetailPage from './components/InterviewDetailPage';

import ActivityPage from './components/ActivityPage';
import ActivityDetailPage from './components/ActivityDetailPage';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import FindMyPassPage1 from './components/FindMyPassPage/FindByMobileForm';
import FindMyPassPage2 from './components/FindMyPassPage/ChangePassWordForm';
import WorkBookPage from './components/BookPage';
import ReactDOM from 'react-dom';

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

import GrapherCenterLayout from './components/layout/center/grapher/GrapherCenterLayout.jsx';
import GrapherIndex from './components/Center/Grapher/Index';
import GrapherUpdate from './components/Center/Grapher/Update/Update';
import GrapherOrder from './components/Center/Grapher/Order';
import OrderList from './components/Center/Grapher/OrderList';

// imports UserCenter for User
import UserCenterLayout from './components/layout/center/user/UserCenterLayout.jsx';
import UserOrderTabLayout from './components/layout/center/user/order/OrderTabLayout.jsx';
import UserOrderListLayout from './components/layout/center/user/order/OrderListLayout.jsx';
import UserOrderDetailLayout from './components/layout/center/user/order/OrderDetailLayout.jsx';
import UserOrderSubmitLayout from './components/layout/center/user/order/OrderSubmitLayout.jsx';
import UserOrderSubmitResultLayout from './components/layout/center/user/order/OrderSubmitResultLayout.jsx';
import UserOrderRefundLayout from './components/layout/center/user/order/OrderRefundLayout.jsx';

// imports GrapherCenter for Grapher
import GrapherOrderTabLayout from './components/layout/center/grapher/order/OrderTabLayout.jsx';
import GrapherOrderDetailLayout from './components/layout/center/grapher/order/OrderDetailLayout.jsx';
// imports purse for Grapher
import PurseLayout from './components/layout/center/grapher/purse/PurseLayout.jsx';
import PurseTabLayout from './components/layout/center/grapher/purse/PurseTabLayout';
import PurseDetailListLayout from './components/layout/center/grapher/purse/PurseListLayout.jsx';
import PurseDetailLayout from './components/layout/center/grapher/purse/PurseDetailLayout.jsx';

//绑定支付宝 提现
import BindCard from './components/layout/center/grapher/withdraw/BindCard.jsx';
import WithdrawDeposit from './components/layout/center/grapher/withdraw/WithdrawDeposit.jsx';

main();

function main(){
  ReactDOM.render((
    <Router>
      <Route path="/">
        <IndexRoute component={AppIndex} />
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

        <Route path="center">
          {/*用户中心*/}
          <Route path="u">
            <IndexRoute component={UserCenterPage} />
            <Route path="order" component={UserOrderTabLayout} />
            <Route path="order/:id">
              <IndexRoute  component={UserOrderDetailLayout}/>
              <Route path="submit">
                <IndexRoute component={UserOrderSubmitLayout}/>
                <Route path="result" component={UserOrderSubmitResultLayout}/>
              </Route>
              <Route path="refund" component={UserOrderRefundLayout}/>
            </Route>
          </Route>
          {/*摄影师中心*/}
          <Route path="g">
            <IndexRoute component={UserCenterPage} />
            <Route path="order" component={GrapherOrderTabLayout} />
            <Route path="order/:id">
              <IndexRoute component={GrapherOrderDetailLayout}/>
            </Route>
            {/* 摄影师钱包 */}
            <Route path="purse">
              <IndexRoute component={PurseLayout}/>
              <Route path="detail" component={PurseTabLayout} />
              <Route path="detail/:id" component={PurseDetailLayout} />
              <Route path="bind" component={BindCard} />
              <Route path="withdraw" component={WithdrawDeposit} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Router>
    ), document.getElementById('app')
  );
}
