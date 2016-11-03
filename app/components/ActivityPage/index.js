import React from 'react'
import {Route, IndexRedirect } from 'react-router'

import ActivityList from './ActivityList/ActivityList'
import ActivityDetail from './ActivityDetail/ActivityDetail'
import ActivityJoin from './ActivityJoin/ActivityJoin'

const activityRouter =
  <Route path="activity">
    <IndexRedirect to="activityList" />
    <Route path="activityList" component={ActivityList} />
    <Route path="activityDetail/:Id" component={ActivityDetail} />
    <Route path="activityJoin/:Id" component={ActivityJoin} />
  </Route>

export default activityRouter