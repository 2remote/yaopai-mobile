import React from 'react'
import {Route, IndexRedirect} from 'react-router'

import MakeupArtistWorkPage from './WorkPage/WorkPage'
import MakeWorkDetailPage from './WorkDetailPage/WorkDetailPage'
import MakeupArtistProfile from './MakeupArtistProfile/MakeupArtistProfile'

const makeupArtistRouter =
  <Route path="makeupArtist">
    <IndexRedirect to="makeupArtistWorkPage" />
    <Route path="workPage" component={MakeupArtistWorkPage} />
    <Route path="/workDetail/:Id" component={MakeWorkDetailPage} />
    <Route path="makeupArtistProfile" component={MakeupArtistProfile} />
  </Route>

export default makeupArtistRouter
