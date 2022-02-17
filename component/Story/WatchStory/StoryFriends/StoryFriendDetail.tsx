import React, { useEffect, useState } from "react";
import { StoryType } from "../../../../type/Stories";
import { UserType } from "../../../../type/User";
import { ListItemWithAvatatar } from "../../../ListItemWithAvatar/ListItemWithAvatar";
import { storyId, userId } from "../../../../redux/slice/Stories";
import {
  storyFriendIndex,
  showStoryDetail,
  setPause,
} from "../../../../redux/slice/Stories";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
export const StoryFriendDetail = ({
  friend,
  index,
  AllStories,
  pauseFlagMouse,
}: {
  friend: UserType;
  index: number;

  AllStories: StoryType[];
  pauseFlagMouse: React.MutableRefObject<boolean>;
}) => {
  const [active, setActive] = useState(0);
  const StoryFriendIndex = useAppSelector(storyFriendIndex);
  useEffect(() => {
    setActive(StoryFriendIndex);
  }, [StoryFriendIndex]);
  const [isNotWatched, setIsNotWatched] = useState(
    AllStories?.find(
      (story) => story.userId._id === friend._id
    )?.stories.filter(
      (storys) => !storys.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
    ).length as number
  );

  const StoryId = useAppSelector(storyId);
  const dispatch = useAppDispatch();
  const stories = AllStories?.filter(
    (story) => story.userId._id === friend._id
  );

  const [isNotWatchedStory, setIsNotWatchedStory] = useState(
    stories &&
      stories[0]?.stories.filter(
        (story) => !story.viewerIds.includes("61b5cfe89f7f6d222bab9d67")
      )
  );
  useEffect(() => {
    if (StoryFriendIndex === index) {
      handleChangeFriendStory();
    }
  }, [StoryFriendIndex]);
  useEffect(() => {
    if (StoryFriendIndex === index) {
      // check current story if it's unwatched then decrease it by 1
      const checkUnwatchedStory = stories.filter((story) =>
        story.stories.find((st) => st._id === StoryId)
      );
      if (checkUnwatchedStory.length > 0) {
        setIsNotWatched(isNotWatched - 1);

        setIsNotWatchedStory(
          isNotWatchedStory.filter((story) => story._id !== StoryId)
        );
      }
    }
  }, [StoryId]);
  const handleChangeFriendStory = () => {
    pauseFlagMouse.current = false;
    setActive(index);
    dispatch(setPause(false));
    dispatch(
      showStoryDetail({
        userId: friend?._id,
        storyFriendIndex: index,
        storyId:
          isNotWatchedStory?.length > 0 ? isNotWatchedStory[0]?._id : StoryId,
      })
    );
  };
  return (
    <div onClick={handleChangeFriendStory} className="px-1">
      <ListItemWithAvatatar
        AvatarBorderColor="primary"
        needClick={true}
        clicked={index === active}
        isWatched={isNotWatched > 0 ? false : true}
        AvatarSize="h-12 w-12"
        height={"76px"}
        src={friend.img}
        title={friend.name}
        rouneded={"rounded-full"}
        news={isNotWatched}
        active={false}
      />
    </div>
  );
};
