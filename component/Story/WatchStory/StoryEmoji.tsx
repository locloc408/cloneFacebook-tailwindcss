import React from "react";
import { Emoji } from "../../dummyData/emoji";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { postStoryReaction, setPause } from "../../../redux/slice/Stories";
import { setReaction } from "../../../redux/slice/Reaction";
import { storyId, userId } from "../../../redux/slice/Stories";
export const StoryEmoji = ({
  pauseFlagMouse,
}: {
  pauseFlagMouse: React.MutableRefObject<boolean>;
}) => {
  const dispatch = useAppDispatch();
  const StoryId = useAppSelector(storyId);
  const UserId = useAppSelector(userId);
  return (
    <div
      onMouseOver={() => {
        pauseFlagMouse.current = true;
        dispatch(setPause(true));
      }}
      onMouseLeave={() => {
        pauseFlagMouse.current = false;
        dispatch(setPause(false));
      }}
      className="flex space-x-2 ml-2"
    >
      {Emoji.map((emoji) => {
        return (
          <div
            key={emoji.id}
            className="hover:scale-125 cursor-pointer transform"
            onClick={() => {
              //update reaction to DB

              dispatch(
                postStoryReaction({
                  viewerId: "61b5cfe89f7f6d222bab9d67",
                  type: emoji?.type,
                  storyId: StoryId,
                  userId: UserId,
                })
              );

              //update reaction in redux
              dispatch(
                setReaction({
                  type: emoji.type,
                  storyId: StoryId,
                  viewerId: "61b5cfe89f7f6d222bab9d67",
                })
              );
            }}
          >
            <img src={`/emoji/${emoji?.type}.svg`} height="40px" width="40px" />
          </div>
        );
      })}
    </div>
  );
};
