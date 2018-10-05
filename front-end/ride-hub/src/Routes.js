import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/views/home';
import Channel from './components/views/subforum';
import App from './components/App';

export default (
  <Route basename={process.env.PUBLIC_URL} path={'/'} component={App}>
    <IndexRoute component={Home} />
    <Route path={'/subforum/:id'} component={Channel} />
    <Route path={'*'} component={Home} />
  </Route>
);