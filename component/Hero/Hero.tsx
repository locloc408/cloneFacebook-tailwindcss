import React, { memo } from "react";
import { LeftSideMenuGroups } from "./LeftSideMenuGroups";
import { LeftSideMenu } from "./LeftSideMenu";
import { RightSideMenuFriends } from "./RightSideMenuFriends";
import { FriendRequest } from "./FriendRequest";
import { Stories } from "./Stories";
import { PostStatus } from "../Status/PostStatus";
import { CreateMeet } from "../Meet/CreateMeet";
const hero = () => {
  return (
    <div className="flex justify-center h-screen bg-main">
      <div
        className="fixed top-0 mt-14  w-1/5 left-0 overflow-y-auto "
        style={{
          height: "calc(100% - 56px)",
        }}
      >
        <LeftSideMenu />
        <LeftSideMenuGroups />
      </div>
      <div className="lg:w-2/3 pt-16 relative" style={{ width: "590px" }}>
        <Stories />
        <PostStatus />
        <CreateMeet />
      </div>
      <div
        className="fixed top-0 mt-14 right-0 overflow-y-auto bg-main mr-2"
        style={{
          height: "calc(100% - 56px)",
          width: "315px",
        }}
      >
        <FriendRequest />
        <RightSideMenuFriends />
      </div>
    </div>
  );
};

export const Hero = memo(hero);
