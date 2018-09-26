import React from 'react';
import ReactDom from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

require('./stylesheets/stylesheet.scss');
require('./stylesheets/home.scss');
require('./stylesheets/thread.scss');

ReactDom.render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector('#app')
);
