import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom'
import Home from './components/views/home';
import Channel from './components/views/subforum';
import Thread from './components/views/thread';
import AddThread from './components/views/addthread';
import App from './components/App';

export default (
  <HashRouter basename={process.env.PUBLIC_URL} path={'/'} component={App}>
    <IndexRoute component={Home} />
    <HashRouter path={'/subforum/:id'} component={Channel} />
    <HashRouter path={'/thread/:id'} component={Thread}/>
    <HashRouter path={'/addthread/'} component={AddThread}/>
    <HashRouter path={'*'} component={Home} />
  </HashRouter>
);