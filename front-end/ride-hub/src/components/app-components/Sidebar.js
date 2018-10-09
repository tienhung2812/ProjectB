import React, { Component } from 'react';
import NewestThread from './sidebar-components/newestThread';
import RecentAvtivities from './sidebar-components/recentAvtivities';
import Billboard from './sidebar-components/billboard';
import Credit from './sidebar-components/credit';
import '../stylesheet/Sidebar.css';
class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-content">
        <NewestThread/>
        <RecentAvtivities/>
        <Billboard/>
        <Credit/>
      </div>
    );
  }
}

export default Sidebar;
