import React, { useState } from "react";
import { useEffect } from "react";
import { UserType } from "../../../../type/User";
import { useAppSelector } from "../../../../redux/hooks";
import { storyFriendIndex } from "../../../../redux/slice/Stories";
import { StoryType } from "../../../../type/Stories";
import { StoryFriendDetail } from "./StoryFriendDetail";
export const StoryListFriends = ({
  AllStories,
  Friends,
  pauseFlagMouse,
}: {
  Friends: UserType[];
  pauseFlagMouse: React.MutableRefObject<boolean>;
  AllStories: StoryType[];
}) => {
  const [active, setActive] = useState(0);
  const StoryFriendIndex = useAppSelector(storyFriendIndex);

  useEffect(() => {
    setActive(StoryFriendIndex);
  }, [StoryFriendIndex]);

  return (
    <div>
      <div className="ml-3">
        <p className="text-base font-semibold ">Tất cả tin</p>
      </div>
      <div>
        {Friends.map((friend, index) => {
          return (
            <div key={friend._id}>
              <StoryFriendDetail
                setActive={setActive}
                pauseFlagMouse={pauseFlagMouse}
                AllStories={AllStories}
                friend={friend}
                index={index}
                active={active}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
