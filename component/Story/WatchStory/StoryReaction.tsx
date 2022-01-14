import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { storyReaction } from "../../../redux/slice/Reaction";
import { StoryAction } from "./StoryAction";
import { nanoid } from "@reduxjs/toolkit";
import { storyFriendIndex } from "../../../redux/slice/Stories";
import { sortedStoryType } from "../../../type/Stories";
import { UserType } from "../../../type/User";
export const StoryReaction = ({
  story,
  Friends,
}: {
  story: sortedStoryType;
  Friends: UserType[];
}) => {
  const storyReactions = useAppSelector(storyReaction);
  const StoryFriendIndex = useAppSelector(storyFriendIndex);
  const [reaction, setReaction] = useState(storyReactions);
  useEffect(() => {
    if (StoryReaction.length > 5) {
      setReaction(
        storyReactions.slice(StoryAction.length - 6, StoryReaction.length)
      );
    } else {
      setReaction(storyReactions);
    }
  }, [storyReactions]);
  return (
    <div className="absolute left-1 bottom-1">
      <div className="flex space-x-2">
        {/* fillter to get the reaction of the current user with the right storyId  */}
        {storyReactions.length > 0 &&
          reaction
            .filter((reaction) => reaction.storyId === story.storyContainer._id)
            .filter(
              (reaction) => reaction.viewerId === "61b5cfe89f7f6d222bab9d67"
            )
            .map((reaction) => {
              return (
                <div key={nanoid()}>
                  <img
                    height={"20px"}
                    width="20px"
                    src={`/emoji/${reaction.type}.svg`}
                  />
                </div>
              );
            })}
        {reaction
          .filter((reaction) => reaction.storyId === story.storyContainer._id)
          .filter(
            (reaction) => reaction.viewerId === "61b5cfe89f7f6d222bab9d67"
          ).length > 0 && (
          <div>Đã gửi cho {Friends[StoryFriendIndex].name} </div>
        )}
      </div>
    </div>
  );
};
