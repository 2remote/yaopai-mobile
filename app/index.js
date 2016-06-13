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
import SignupPage from './components/LoginPage/SignupPage';
import FindByMobileForm from './components/LoginPage/FindByMobileForm';
import ChangePassWordForm from './components/LoginPage/ChangePassWordForm';
import WorkBookPage from './components/BookPage';
import ReactDOM from 'react-dom';

import UserCenterPage from './components/UserCenterPage';
import UserEditProfile from './components/UserCenterPage/UserEditProfilePage';
import UserNickNameChange from './components/UserCenterPage/UserNickNameChangePage';
import UserGenderChange from './components/UserCenterPage/UserGenderChangePage';
import UserCityChange from './components/UserCenterPage/UserCityChangePage';

import GrapherCenterPage from './components/UserCenterPage/GrapherCenterPage';

// imports UserCenter for User
import UserOrderTabLayout from './components/layout/center/user/order/OrderTabLayout.jsx';
import UserOrderDetailLayout from './components/layout/center/user/order/OrderDetailLayout.jsx';
import UserOrderSubmitResultLayout from './components/layout/center/user/order/OrderSubmitResultLayout.jsx';
import UserOrderRefundLayout from './components/layout/center/user/order/OrderRefundLayout.jsx';

// imports GrapherCenter for Grapher
import GrapherOrderTabLayout from './components/layout/center/grapher/order/OrderTabLayout.jsx';
import GrapherOrderDetailLayout from './components/layout/center/grapher/order/OrderDetailLayout.jsx';
// imports purse for Grapher
import PurseLayout from './components/layout/center/grapher/purse/PurseLayout.jsx';
import PurseTabLayout from './components/layout/center/grapher/purse/PurseTabLayout';
import PurseDetailLayout from './components/layout/center/grapher/purse/PurseDetailLayout.jsx';

//绑定支付宝 提现
import BindCardLayout from './components/layout/center/grapher/purse/BindCardLayout.jsx';
import CardDetailLayout from './components/layout/center/grapher/purse/CardDetailLayout.jsx';
import WithdrawDepositLayout from './components/layout/center/grapher/purse/WithdrawDepositLayout.jsx';

main();

function main(){
  ReactDOM.render((
    <Router>
      <Route path="/">
        <IndexRedirect to="/work(/:tag)(/:tag)(/:tag)(/:tag)" />
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
        <Route path="/findByMobileForm" component={FindByMobileForm} />
        <Route path="/changePassWordForm" component={ChangePassWordForm} />
        <Route path="/work_book_page/:workId/:photographerId" component={WorkBookPage} />

        <Route path="/user_center" component={UserCenterPage} />
        <Route path="/user_edit_profile" component={UserEditProfile} />
        <Route path="/user_nickname_change" component={UserNickNameChange} />
        <Route path="/user_gender_change" component={UserGenderChange} />
        <Route path="/user_city_change" component={UserCityChange} />

        <Route path="/grapher_center" component={GrapherCenterPage} />

        <Route path="center">
          {/*用户中心*/}
          <Route path="u">
            <IndexRoute component={UserCenterPage} />
            <Route path="order">
              <IndexRoute component={UserOrderTabLayout} />
              <Route path="submit/:id">
                <IndexRedirect to="/center/u/order/:id" />
                <Route path="result" component={UserOrderSubmitResultLayout}/>
              </Route>
            </Route>
            <Route path="order/:id">
              <IndexRoute  component={UserOrderDetailLayout}/>
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
              <Route path="detail/:type/:id" component={PurseDetailLayout} />
              <Route path="bind" component={BindCardLayout} />
              <Route path="bindDetail" component={CardDetailLayout} />
              <Route path="withdraw" component={WithdrawDepositLayout} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* 填错 URL 的情况一律跳转到首页 */}
      <Route path="*" component={ WorkPage } />
    </Router>
    ), document.getElementById('app')
  );
}
