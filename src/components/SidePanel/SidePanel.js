import React from "react";
import { Menu, Segment, Comment } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";

import SmoochMessages from "./SmoochMessages";

import Starred from "./Starred";

class SidePanel extends React.Component {
  render() {
    const { currentUser, sideColor, primaryColor } = this.props;

    return (
      <Menu
        size="large"
        fixed="left"
        vertical
        style={{ background: primaryColor, fontSize: "1.2rem" }}
      >
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        
        {/* <SmoochMessages currentUser={currentUser} />*/} 
        <Segment>
        <Comment.Group className="sidepanel_marcados">
            <Starred currentUser={currentUser} />
          </Comment.Group>
          <Comment.Group className="sidepanel">
            <Channels currentUser={currentUser} />
          </Comment.Group>
          <Comment.Group className="sidepanel_diretos">
            <DirectMessages currentUser={currentUser} />
          </Comment.Group>

        </Segment>
      </Menu>
    );
  }
}

export default SidePanel;
