import React from 'react'
import {Link} from 'react-router'
import SidePage from './SidePage'

const CharacterBar = () =>
  <div className="character-bar">
    <SidePage />
    <nav className="navbar">
      <a href="javascript:void(0)"></a>
      <Link activeClassName="active" to="/discover/mote/moteWorkPage">模特</Link>
      <Link activeClassName="active" to="/discover/makeupArtist/workPage">化妆师</Link>
      <Link activeClassName="active" to="/2">活动</Link>
      <Link activeClassName="active" to="/2">摄影基地</Link>
    </nav>
  </div>

export default CharacterBar
