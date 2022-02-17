import React, { useState } from "react";
import { useEffect } from "react";
import { UserType } from "../../../../type/User";
import { useAppSelector } from "../../../../redux/hooks";
import { storyFriendIndex } from "../../../../redux/slice/Stories";
import { StoryType } from "../../../../type/Stories";
import { StoryFriendDetail } from "./StoryFriendDetail";
import { nanoid } from "@reduxjs/toolkit";
export const StoryListFriends = ({
  AllStories,

  pauseFlagMouse,
}: {
  pauseFlagMouse: React.MutableRefObject<boolean>;
  AllStories: StoryType[];
}) => {
  return (
    <div>
      <div className="ml-3">
        <p className="text-base font-semibold ">Tất cả tin</p>
      </div>
      <div>
        {AllStories?.map((friend, index) => {
          return (
            <div key={nanoid()}>
              <StoryFriendDetail
                pauseFlagMouse={pauseFlagMouse}
                AllStories={AllStories}
                friend={friend.userId}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
