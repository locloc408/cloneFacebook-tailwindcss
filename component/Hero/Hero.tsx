import React, { memo, useState } from "react";
import { LeftSideMenuGroups } from "./LeftSideMenuGroups";
import { LeftSideMenu } from "./LeftSideMenu";
import { RightSideMenuFriends } from "./RightSideMenuFriends";
import { FriendRequest } from "./FriendRequest";
import { Stories } from "./Stories";
import { PostStatus } from "../Status/PostStatus";
import { CreateMeet } from "../Meet/CreateMeet";
import { StatusList } from "../Status/StatusList";
import { fecthData } from "../../lib/axios/fetchClientData";
import { sortStory } from "../../utils/utils";
import { useEffect } from "react";
import { LatestStory } from "../../type/Stories";
const hero = () => {
  const [loading, setLoading] = useState<boolean>(true);
  console.log(loading);
  const [latestStories, setLatestStories] = useState<LatestStory[]>([]);
  const getStories = async () => {
    const stories = await fecthData.getStories();
    if (stories.length > 0) {
      setLoading(false);
    }
    const Stories = sortStory(stories);

    const LatestStories = Stories.slice(0, 4);

    setLatestStories(LatestStories);
  };
  useEffect(() => {
    getStories();
  }, []);
  return loading === true ? (
    <div className="h-screen w-full flex justify-center items-center">
      <div
        style={{
          border: "10px solid #f3f3f3",
          borderTop: "10px solid #3498db",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
        }}
        className="animate-spin"
      ></div>
    </div>
  ) : (
    <div className="flex justify-center h-full bg-main">
      <div
        className="fixed top-0 mt-14  w-1/5 left-0 overflow-y-auto bg-main"
        style={{
          height: "calc(100% - 56px)",
        }}
      >
        <LeftSideMenu />
        <LeftSideMenuGroups />
      </div>
      <div
        className="lg:w-2/3 pt-16 relative bg-main"
        style={{ width: "590px" }}
      >
        <Stories latestStories={latestStories} />
        <PostStatus />
        <CreateMeet />
        <StatusList />
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
