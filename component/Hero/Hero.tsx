import React, { memo, useEffect, useState } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { LatestStory } from "../../type/Stories";
import { sortStory } from "../../utils/utils";
import { CreateMeet } from "../Meet/CreateMeet";
import { PostStatus } from "../Status/PostStatus";
import { StatusList } from "../Status/StatusList";
import { FriendRequest } from "./FriendRequest";
import { LeftSideMenu } from "./LeftSideMenu";
import { LeftSideMenuGroups } from "./LeftSideMenuGroups";
import { RightSideMenuFriends } from "./RightSideMenuFriends";
import useSWR from "swr";
import { UserType } from "../../type/User";
import { Stories } from "./Stories";
import { StatusResponseList } from "../../type/Status";
const hero = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const getStatus = async () => {
    const status = await fecthData.getStatuses("61b5cfe89f7f6d222bab9d67");
    return status;
  };
  const getUser = async () => {
    const user = await fecthData.getUserById("61b5cfe89f7f6d222bab9d67");
    return user;
  };
  const getStories = async () => {
    const stories = await fecthData.getStories();
    const Stories = sortStory(stories);

    const LatestStories = Stories.slice(0, 4);
    return LatestStories;
  };
  const { data: data } = useSWR("61b5cfe89f7f6d222bab9d67", getStatus);
  const { data: user } = useSWR("61b5cfe89f7f6d222bab9d67/user", getUser);
  const { data: latestStories } = useSWR("latestStory", getStories);
  useEffect(() => {
    if (data && latestStories) {
      setLoading(false);
    }
  }, [data]);
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
        <Stories latestStories={latestStories as LatestStory[]} />
        <PostStatus />
        <CreateMeet />
        <StatusList
          user={user as UserType}
          data={data as StatusResponseList[]}
        />
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
