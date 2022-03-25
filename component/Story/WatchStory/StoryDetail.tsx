import { nanoid } from "@reduxjs/toolkit";
import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { userId } from "../../../redux/slice/Stories";
import { sortedStoryType, StoryType } from "../../../type/Stories";
import { UserType } from "../../../type/User";
import { Slider } from "../../Slider/slider";
const storyDetail = ({
  Friends,
  pauseFlagMouse,
  AllStories,
}: {
  Friends: UserType[];
  pauseFlagMouse: React.MutableRefObject<boolean>;
  AllStories: StoryType[];
}) => {
  const [sortedStory, setSortedStory] = useState<sortedStoryType[]>([]);
  const UserId = useAppSelector(userId);
  useEffect(() => {
    const story = AllStories.find((story) => story.userId._id === UserId);
    const sortedStory = story?.stories?.map((story, index) => {
      return {
        index: index,
        storyContainer: story,
      };
    });
    setSortedStory(sortedStory as sortedStoryType[]);
  }, [UserId]);
  return (
    <div key={nanoid()}>
      <Slider
        pauseFlagMouse={pauseFlagMouse}
        Friends={Friends}
        AllStories={AllStories}
        sortedStory={sortedStory as sortedStoryType[]}
      />
    </div>
  );
};
export const StoryDetail = memo(storyDetail);
