import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './main-views/home';
import Channel from './main-views/channel';
import App from './main-views/main-app'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='channel' component={Channel} />
    <Route path='*' component={Home} />
  </Route>
);