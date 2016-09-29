import React from 'react'
import {Route, IndexRedirect } from 'react-router'

import MoteWorkPage from './WorkPage/WorkPage'
import MoteWorkDetailPage from './WorkDetailPage/WorkDetailPage'
import MoteProfile from './MoteProfile/MoteProfile'

const moteRouter =
  <Route path="mote">
    <IndexRedirect to="moteWorkPage" />
    <Route path="workPage" component={MoteWorkPage} />
    <Route path="/workDetail/:Id" component={MoteWorkDetailPage} />
    <Route path="moteProfile" component={MoteProfile} />
  </Route>

export default moteRouter
