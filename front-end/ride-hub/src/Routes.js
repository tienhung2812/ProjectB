import React from 'react';
import {IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom'
import Home from './components/views/home';
import Channel from './components/views/subforum';
import Thread from './components/views/thread';
import AddThread from './components/views/addthread';
import SignUp from './components/views/signup';
import UserProfile from './components/views/UserProfile';
import FilterSearchPage from './components/views/filterSearchPage';
import ResetPassword from './components/views/resetpassword';
import AdminPanel from './components/views/admin';
import TermsAndPolicies from './components/views/termsAndPolicies';
import AboutUs from './components/views/aboutus';
import App from './components/App';

export default (
  <HashRouter basename={process.env.PUBLIC_URL} path={'/'} component={App}>
    <IndexRoute component={Home} />
    <HashRouter path={'/subforum/:id'} component={Channel} />
    <HashRouter path={'/thread/:id'} component={Thread}/>
    <HashRouter path={'/addthread/:subforumID'} component={AddThread}/>
    <HashRouter path={'/signup'} component={SignUp}/>
    <HashRouter path={'/UserProfile/:guestid'} component={UserProfile}/>
    <HashRouter path={'/admin'} component={AdminPanel}/>
    <HashRouter path={'/filterSearch/:data'} component={FilterSearchPage}/>
    <HashRouter path={'/resetpassword/:data'} component={ResetPassword}/>
    <HashRouter path={'/termsandpolicies'} component={TermsAndPolicies}/>
    <HashRouter path={'/aboutus'} component={AboutUs}/>
    <HashRouter path={'*'} component={Home} />
  </HashRouter>
);