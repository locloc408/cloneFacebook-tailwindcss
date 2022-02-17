import React, { useState, useEffect, memo } from "react";
import { fecthData } from "../../../lib/axios/fetchClientData";
import { useAppSelector } from "../../../redux/hooks";
import { userId } from "../../../redux/slice/Stories";
import { StoryType, sortedStoryType } from "../../../type/Stories";
import { nanoid } from "@reduxjs/toolkit";
import { Slider } from "../../Slider/slider";
import { UserType } from "../../../type/User";
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
