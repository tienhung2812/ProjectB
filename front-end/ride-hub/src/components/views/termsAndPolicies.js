import React, { Component } from "react";
import './view-stylesheet/termsandpolicies.css';


export default class TermsAndPolicies extends Component {
  constructor(props){
    super(props);
  }

  
  render() {
    return (
        <div className="main-content">
          <div className="tp-main">
            <div className="title">Terms And Policies</div>
            <div className="tp-content">
                <p>RideHub is a motorcycle community for those who are here to learn new information, to help each other, and to share their knowledge.
                To build a friendly playground, all members must follow these simple rules which are defined below:</p>

                <ul>
                <li><p>Do not violate the laws of the Socialist Republic of Vietnam.</p></li>

                <li><p>Do not violate the traditions and customs of Vietnam.</p></li>

                <li><p>Posts should not be related to politics or religion.</p></li>

                <li><p>No spam. All advertisements and links to your site or product will be deleted immediately. </p></li>

                <li><p>All the forums are categorized by topics.  Please post your questions in the relavant sub-forums only. Posts are uploaded in the wrong area will be removed and placed in the correct sub-forum by the moderators.</p></li>

                <li><p>If a topic is posted in a forum that is not appropriate for the question, the staff has the right to move that topic to another better suited forum.</p></li>

                <li><p>The posting of any copyrighted material on our web site is strictly prohibited.</p></li>

                <li><p>No vulgar or violent images are used to post or used as profile avatars. If any posts or avatars are found to be inappropriate will be removed by moderators/admin.</p></li>

                <li><p>Re-posting of copyrighted materials or other illegal content is not allowed. Any posts containing illegal content or copyrighted materials will be deleted.</p></li>

                <li><p>Members may have only one account on this forum. There is no need to have more than one. Reinstatement of banned or cancelled accounts can come only from an administrator. </p></li>

                <li><p>No threats or harassment of other users will be tolerated. Do not purposely intimidate a particular member, harass them, send them rude or unwanted private messages.</p></li>

                <li><p>Avoid redundant posts. Please make sure that your post is not similar to other posts by investing a few minutes to search in the forum if the topic already exists.</p></li>

                <li><p>The articles and contents must be clear and suitable.</p></li>
                </ul>

                <p>Violation of any of these rules can lead to a banning of the user from our Web Site and a deletion of their account. The consequences will be determined by the Admin on a case by case basis.</p>

                <p>When posting you agree that the administrators and the moderators of this forum have the right to modify, delete, edit or close any topic, signature, account, or profile data at any time that they see fit. </p>
            </div>
          </div>
        </div>
    );
    
      
  }
}

