import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { StoryType } from "../../../../type/Stories";
import { StoryFriendDetail } from "./StoryFriendDetail";
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
