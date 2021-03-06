import { nanoid } from "@reduxjs/toolkit";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { fecthData } from "../../lib/axios/fetchClientData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setStoryId,
  showStoryDetail,
  storyFriendIndex,
  storyId,
  userId,
} from "../../redux/slice/Stories";
import { sortedStoryType, StoryType } from "../../type/Stories";
import { UserType } from "../../type/User";
import { Avatar } from "../Avatar/Avatar";
import { Progress } from "../Progress/Progress";
import { StoryAction } from "../Story/WatchStory/StoryAction";
import { StoryReaction } from "../Story/WatchStory/StoryReaction";
const slider = ({
  pauseFlagMouse,
  Friends,
  AllStories,
  sortedStory,
}: {
  Friends: UserType[];
  pauseFlagMouse: React.MutableRefObject<boolean>;
  AllStories: StoryType[];
  sortedStory: sortedStoryType[];
}) => {
  const StoryId = useAppSelector(storyId);
  const UserId = useAppSelector(userId);
  const [current, setCurrent] = useState<number>(0);
  const dispatch = useAppDispatch();
  const StoryFriendIndex = useAppSelector(storyFriendIndex);
  const [firstFriend, setFirst] = useState(
    StoryFriendIndex === 0 ? true : false
  );
  const storyTimeOutRef = useRef<any>(null);

  const [lastFriend, setLast] = useState(
    StoryFriendIndex === Friends?.length - 1 ? true : false
  );

  const findIndex = () => {
    const find = sortedStory?.find(
      (story) => story.storyContainer._id === StoryId
    );
    let index = sortedStory?.indexOf(find as sortedStoryType);
    if (index === -1) {
      return (index = 0);
    }
    return index;
  };

  const Next = useCallback(() => {
    pauseFlagMouse.current = false;
    if (lastFriend === false) {
      console.log("last");
      setCurrent((prev) => {
        if (current < sortedStory?.length - 1) {
          //story the next storyId
          dispatch(setStoryId(sortedStory[current + 1]?.storyContainer._id));
          console.log("1");
          return prev + 1;
        } else {
          const friend = Friends[StoryFriendIndex + 1];
          console.log({
            userId: friend?._id,
            storyFriendIndex: StoryFriendIndex + 1,
            storyId: AllStories.find(
              (stories) => stories.userId._id === friend._id
            )?.stories[0]._id as string,
            sortedStory,
          });
          dispatch(
            showStoryDetail({
              userId: friend?._id,
              storyFriendIndex: StoryFriendIndex + 1,
              storyId: AllStories.find(
                (stories) => stories.userId._id === friend._id
              )?.stories[0]._id as string,
            })
          );
          const prev = 0;
          return prev;
        }
      });
    } else {
      if (current === sortedStory.length - 1) {
        console.log("ka");
      } else {
        setCurrent((prev) => {
          if (current < sortedStory?.length - 1) {
            dispatch(setStoryId(sortedStory[current + 1]?.storyContainer._id));
            return prev + 1;
          } else {
            const prev = 0;
            const friend = Friends[StoryFriendIndex + 1];
            dispatch(
              showStoryDetail({
                userId: friend?._id,
                storyFriendIndex: StoryFriendIndex + 1,
                storyId: AllStories.find(
                  (stories) => stories.userId._id === friend._id
                )?.stories[0]._id as string,
              })
            );
            return prev;
          }
        });
      }
    }
  }, [current]);

  const updatedWatchStory = useCallback(async () => {
    await fecthData.setWatchedStory({
      viewerId: "61b5cfe89f7f6d222bab9d67",
      userId: UserId,
      storyId: sortedStory[current]?.storyContainer._id,
    });
  }, [current]);

  useEffect(() => {
    if (
      sortedStory &&
      !sortedStory[current]?.storyContainer.viewerIds.includes(UserId)
    ) {
      updatedWatchStory();
    }
  }, [current]);

  // every 5s change story
  useEffect(() => {
    let time = 0;
    storyTimeOutRef.current = setInterval(() => {
      if (!pauseFlagMouse.current) {
        time++;
        if (time === 20) {
          time = 0;
          Next();
        }
      }
    }, 250);

    return () => {
      clearInterval(storyTimeOutRef.current);
    };
  });

  useEffect(() => {
    setCurrent(findIndex());
  }, [StoryId, StoryFriendIndex]);

  const Back = useCallback(() => {
    pauseFlagMouse.current = false;
    setCurrent((prev) => {
      if (current > 0) {
        console.log(sortedStory[sortedStory.length - 1]?.storyContainer._id);
        dispatch(
          setStoryId(sortedStory[sortedStory.length - 1]?.storyContainer._id)
        );
        return prev - 1;
      } else {
        const prev = 0;
        const friend = Friends[StoryFriendIndex - 1];
        const stories = AllStories.find((story) => story.userId._id === UserId);
        dispatch(
          showStoryDetail({
            userId: friend?._id,
            storyFriendIndex: StoryFriendIndex - 1,
            storyId: stories?.stories[stories.stories.length - 1]._id as string,
          })
        );
        return prev;
      }
    });
  }, [current]);
  return (
    <div className="h-full w-full relative">
      {/* previus thumb */}
      {(current === 0 && firstFriend === true) || (
        <div
          onClick={Back}
          className="bg-gray-200 w-11 h-11 rounded-full flex flex-col justify-center items-center absolute -left-20 top-1/2 cursor-pointer hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      )}

      {sortedStory?.map((story, index) => {
        return (
          <div key={nanoid()}>
            {index === current && (
              <div className="relative">
                {/* main story */}
                <div
                  style={{
                    backgroundImage: `url(${story.storyContainer.ImageStory})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "570px",
                    width: "321px",
                  }}
                  className={
                    "h-full w-full  justify-center items-center rounded-md flex " +
                    story.storyContainer.textStyle
                  }
                >
                  {story.storyContainer.textInput}
                </div>

                {/* progressTimeOut*/}
                <div
                  className={
                    "absolute grid gap-1 w-full top-3 px-2 " +
                    `grid-cols-${sortedStory?.length}`
                  }
                >
                  {sortedStory?.map((thumb, index) => {
                    return (
                      <div key={index} className={"h-1 text-white rounded-md "}>
                        <Progress
                          pause={pauseFlagMouse}
                          index={index}
                          current={current}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* storyReaction */}
                <StoryReaction story={story} Friends={Friends} />
              </div>
            )}
          </div>
        );
      })}
      <div className="flex  absolute top-10 justify-between w-full px-2 items-center">
        {/* storyInfor */}
        <div className="flex items-center">
          <Avatar
            size="h-10 w-10"
            src={Friends[StoryFriendIndex].img}
            rounded="rounded-full"
            active={false}
            shadow="shadow-sm"
            border=""
          />
          <div className="text-white font-medium pl-3">
            {Friends[StoryFriendIndex].name}
          </div>
        </div>

        {/* story action (volum up , pause story ....) */}
        <StoryAction pauseFlagMouse={pauseFlagMouse} />
      </div>

      {/* next thumb */}
      {(current === sortedStory?.length - 1 && lastFriend === true) || (
        <div
          onClick={Next}
          className="bg-gray-200 w-11 h-11 rounded-full flex flex-col justify-center items-center absolute -right-20 top-1/2 z-10 hover:bg-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
export const Slider = memo(slider);
